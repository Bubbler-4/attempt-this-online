# Installation
You will need approximately 20GB or more free disk space.

## Fully Automated
Download and execute the [setup script](../setup/setup) **on a fresh install of Arch Linux**. Using the setup script in
any other distribution, or on an Arch Linux machine that has already had changes, is not supported.

Attempt It Online is designed to be run as a wholly packaged appliance and as such requires a dedicated virtual machine.
It cannot be run in Docker or similar. *If you do manage to get it working inside a container, please let me know as it
would be very useful for me.*

Upgrading is also not recommended beyond `pacman -Syu`, and there is no script for it. Instead, you should use an
Infrastructure As Code tool like [Terraform](https://terraform.io) to automatically provision and set up new virtual
machines with the new version (also using the setup script).

## Manually (not recommended)
**Warning:** All the code and configuration files in this repository are tuned exactly to a fresh Arch Linux setup and
you will need to change *a lot* of things to get it to work with a custom setup. Absolutely no changes will be made to
support any other system setups.

Read and follow the steps described in the source code of `setup/setup`, adjusting them to your setup as necessary.

## Uninstallation
There is an uninstallation script, `setup/uninstall`, which stops all services and removes all configuration files. It
does not remove any installed dependencies.
