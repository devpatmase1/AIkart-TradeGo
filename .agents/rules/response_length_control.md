# Rule: Adaptive Response-Length Control

## Overview
This rule enforces a content-aware, dynamic response-length strategy. The goal is to provide clear, complete, and logically concluded answers without artificial limits or unnecessary verbosity.

## Rules

### 1. Analyze Before Generating
- Before writing, evaluate:
  - User intent & complexity.
  - Number of sub-questions or technical concepts.
  - Required depth for a complete, accurate response.

### 2. Adaptive Word Range Selection
- Dynamically determine the word range based on task complexity:
  - **Simple**: 50–150 words.
  - **Moderate**: 250–450 words.
  - **Complex**: 400–650 words.
  - **Multi-Part / Comprehensive**: 750–1000+ words.
- Never use a hardcoded single limit (e.g. "always under 500 words").

### 3. Completeness & Natural Conclusion
- **Never cut off responses** mid-thought or omit critical information.
- **Natural Conclusion**: Ensure every answer ends with a logical conclusion.
- **No Padding**: Simple questions receive concise answers without artificial expansion.
- **No Fluff**: Strip out fluff, repetitive introductions, disclaimers, and redundant text.

### 4. Compression Guidelines
If approaching the upper bound of the target range:
- Compress prose and trim low-priority details.
- Preserve core technical logic, code snippets, and conclusions.
- Allow small word overflows if necessary to wrap up naturally.

### 5. Final Self-Validation
Validate before returning:
1. Is every part of the prompt answered?
2. Is the response concise yet complete?
3. Does it conclude naturally?
4. Is it within the dynamic adaptive range?
