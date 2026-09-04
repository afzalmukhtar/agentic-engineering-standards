# Coding Discipline Examples

These examples are supporting guidance for
`agentic-ai-coding-discipline`, not replacement tests or a separate workflow.
For an approved card, its acceptance test follows `vertical-tdd` and the
test-lock policy. After intentional RED, do not alter a test based on an
example without explicit authorization → new RED → new approval → SHA-256
re-lock.

## Surface Assumptions

**Ambiguous request:** “Add an export of user data.”

Do not silently choose all users, a file location, export fields, or an output
format. First identify the approved card's scope, privacy boundary, volume,
and real interface. If the approved Context or specification does not resolve
one of those choices, return `NEEDS_CONTEXT`.

## Avoid Premature Abstraction

**Small requirement:** Calculate a percentage discount.

```python
def calculate_discount(amount: float, percent: float) -> float:
    return amount * (percent / 100)
```

Do not introduce strategy classes, configurable backends, cache layers, or
unapproved options until the card's requirements require them.

## Make a Surgical Fix

**Approved behavior:** Empty or whitespace-only email returns “Email required.”

```diff
 def validate_user(user_data):
     # Check email format
-    if not user_data.get('email'):
+    email = user_data.get('email', '')
+    if not email or not email.strip():
         raise ValueError("Email required")
```

Do not also restyle quotes, add unrelated username rules, refactor the
function, or delete unrelated pre-existing code. Remove only imports or code
made unused by this ticket.

## Define a Verifiable Goal

**Reported behavior:** Duplicate scores sort nondeterministically.

The card should name a real user-visible ordering rule, the acceptance-test
path and command, the expected intentional RED failure, and the expected GREEN
result. Author that test before production behavior, then stop at RED for user
approval. The locked test—not repeated manual runs—is the executable evidence.

## Card-Scoped Completion Check

Before review, confirm:

1. each change traces to the approved card;
2. production behavior reaches the real locked acceptance-test boundary;
3. tests cover only approved seams and acceptance criteria; and
4. the locked test hash and exact GREEN command are recorded.
