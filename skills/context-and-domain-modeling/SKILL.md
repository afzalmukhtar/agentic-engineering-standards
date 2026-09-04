---
name: context-and-domain-modeling
description: Maintain the durable repository context and domain model.
---

# Context and Domain Modeling

Maintain `docs/agentic/CONTEXT.md` as the durable repository-level picture.
It must describe:

- overall product purpose and scope;
- domain glossary and bounded terminology;
- component inventory and responsibilities;
- module seams and interface boundaries;
- Mermaid architecture and workflow diagrams;
- cross-cutting constraints; and
- a dated decision log with rationale.

Record only confirmed facts and decisions. Preserve unresolved choices as open
questions and ask the user to decide them.

Do not put feature-specific requirements, acceptance criteria, or delivery
scope in Context. Keep those in
`docs/agentic/features/<feature-slug>/SPECIFICATION.md`, which links back to
the Context sections that constrain the feature.
