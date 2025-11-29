---
description: Git workflow for the Tracer project.
---

# Git Workflow

## Overview
We follow a simplified Feature Branch Workflow.

## Branches
- `main`: Production-ready code.
- `develop`: Integration branch for ongoing development.
- `feature/*`: New features (e.g., `feature/hero-section`).
- `fix/*`: Bug fixes.

## Workflow Steps

1.  **Start a new feature**:
    ```bash
    git checkout develop
    git pull origin develop
    git checkout -b feature/my-feature
    ```

2.  **Develop and Commit**:
    ```bash
    git add .
    git commit -m "feat: description of changes"
    ```

3.  **Merge**:
    - Open a Pull Request (PR) to `develop`.
    - Once approved and merged, delete the feature branch.

4.  **Release**:
    - Merge `develop` into `main` for production releases.

## CI/CD (Future)
- GitHub Actions will run linting and build checks on PRs.
