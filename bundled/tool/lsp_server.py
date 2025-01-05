# Copyright (c) Noah Moroze.
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.
"""Thin wrapper over tclsp that handles imports."""
from __future__ import annotations

import os
import pathlib
import sys


# **********************************************************
# Update sys.path before importing any bundled libraries.
# **********************************************************
def update_sys_path(path_to_add: str, strategy: str) -> None:
    """Add given path to `sys.path`."""
    if path_to_add not in sys.path and os.path.isdir(path_to_add):
        if strategy == "useBundled":
            sys.path.insert(0, path_to_add)
        elif strategy == "fromEnvironment":
            sys.path.append(path_to_add)


# Ensure that we can import LSP libraries, and other bundled libraries.
update_sys_path(
    os.fspath(pathlib.Path(__file__).parent.parent / "libs"),
    os.getenv("LS_IMPORT_STRATEGY", "useBundled"),
)

# pylint: disable=wrong-import-position
from tclint.cli import tclsp

if __name__ == "__main__":
    tclsp.main()
