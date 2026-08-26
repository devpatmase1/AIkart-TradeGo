"""Bash tool: execute shell commands under run_dir."""

from __future__ import annotations

import json
import re
import subprocess
from typing import Any

from src.agent.tools import BaseTool
from src.tools._shell_safety import broad_python_kill_error

_OUTPUT_LIMIT = 50_000
_DEFAULT_TIMEOUT = 120


class BashTool(BaseTool):
    """Execute shell commands in the working directory."""

    name = "bash"
    description = (
        "Execute a shell command in the working directory. On Windows the "
        "shell is cmd.exe, not PowerShell. Use for installing packages, "
        "running scripts, or inspecting files. Never kill Python processes "
        "by name; stop a background_run task with cancel_background. "
        "Heredocs (<<) are NOT supported on cmd.exe - write your script to "
        "a file with write_file first, then run it (e.g. python script.py)."
    )
    parameters = {
        "type": "object",
        "properties": {
            "command": {"type": "string", "description": "Shell command to execute"},
        },
        "required": ["command"],
    }
    repeatable = True
    is_readonly = False

    def execute(self, **kwargs: Any) -> str:
        """Execute a shell command.

        Args:
            **kwargs: Must include command. Optional run_dir used as cwd.

        Returns:
            JSON string with stdout, stderr, and exit_code.
        """
        command = kwargs["command"]
        cwd = kwargs.get("run_dir")
        safety_error = broad_python_kill_error(command)
        if safety_error:
            return json.dumps(
                {"status": "error", "error": safety_error},
                ensure_ascii=False,
            )
        # cmd.exe has no heredocs; return a clear message instead of the
        # cryptic "<< was unexpected at this time." stderr. Only multi-line
        # commands with a heredoc delimiter are flagged, so a single-line
        # bit shift (python -c "print(1 << 2)") is unaffected.
        if "\n" in command and re.search(
            r"<<\s*['\"]?[A-Za-z_][A-Za-z0-9_]*", command
        ):
            return json.dumps(
                {
                    "status": "error",
                    "error_code": "heredoc_unsupported",
                    "message": (
                        "Heredoc syntax (<<) is not supported on Windows cmd.exe. "
                        "Write your script to a file first (write_file), then run "
                        "it, e.g. python path\\to\\script.py."
                    ),
                },
                ensure_ascii=False,
            )

        try:
            result = subprocess.run(
                command,
                shell=True,
                cwd=cwd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=_DEFAULT_TIMEOUT,
                encoding="utf-8",
                errors="replace",
            )
            stdout = result.stdout[:_OUTPUT_LIMIT] if len(result.stdout) > _OUTPUT_LIMIT else result.stdout
            stderr = result.stderr[:_OUTPUT_LIMIT] if len(result.stderr) > _OUTPUT_LIMIT else result.stderr
            return json.dumps({
                "status": "ok" if result.returncode == 0 else "error",
                "exit_code": result.returncode,
                "stdout": stdout,
                "stderr": stderr,
            }, ensure_ascii=False)
        except subprocess.TimeoutExpired:
            return json.dumps({
                "status": "error",
                "error": f"Command timed out after {_DEFAULT_TIMEOUT}s",
            }, ensure_ascii=False)
        except Exception as exc:
            return json.dumps({
                "status": "error",
                "error": str(exc),
            }, ensure_ascii=False)
