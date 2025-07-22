#!/bin/bash

git fetch gitlab main

git checkout main
git reset --hard gitlab/main

echo "Pushing changes to GitHub..."
git push github main --force

echo "✅ SYNC completed."
