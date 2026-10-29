---
title: "Notes on Linux and the worst boot loader"
description: "I love when things are more complicated than they need to be"
featured: true
order: 8
draft: false
---

I recently had the pleasure of giving an old laptop a new lease on life.

It's a Lenovo G500, and it was an absolute powerhouse – for the budget anyway – when I recommended it to the buyer over 10 years ago. Today, though, it can barely run more than a handful of browser tabs smoothly.

What's more, the 4GB of RAM, 500GB hard drive and soldered everything else aren't good for parts any more, but they're _perfect_ for Linux.

The owner was, understandably, hesitant to make such a big switch, so I recommended dual booting so it's trivial to switch back if needed.

To my utter surprise, however, Microsoft wants you locked to their platform so they make it difficult to test out other options. I couldn't have seen this coming and neither could you.

Dual booting, the last time I tried it, was relatively straightforward. Today, at least with Windows, it's a confusing mess designed to frustrate users into giving up entirely.

Through a _ton_ of trial and error, however, I managed to find a solid workaround that held up through several cold boot cycles. I suspect I'll be going back to it a lot in this, the Linux Century, so I'm going to log it here for myself and whoever else might be interested!

Basically, Windows Boot Manager does not detect Linux installations by default, as Dibakar Ghosh notes in How-To Geek, and Windows tends to put its boot manager back in charge after updates. On a machine running both systems, GRUB should own the boot menu instead.

Here's how to keep it there:

1. Install Linux while Windows is still on the drive so GRUB lands on the EFI system partition Windows created.
2. Turn off Fast Startup in Windows. It hibernates Windows instead of shutting it down, and the [Arch Wiki](https://wiki.archlinux.org/title/Dual_boot_with_Windows) warns that booting Linux then can damage shared NTFS volumes and EFI system partitions.
3. Make GRUB list Windows. Since version 2.06, upstream GRUB skips the scan for other operating systems by default, which the [GNU GRUB manual](https://www.gnu.org/software/grub/manual/grub/html_node/Simple-configuration.html) calls a potential attack vector, so add GRUB_DISABLE_OS_PROBER=false to /etc/default/grub and regenerate the configuration. Fedora reverses that default.
4. Put GRUB first in the firmware boot order with the firmware setup screen or efibootmgr.
5. Recheck the boot order after Windows updates. Users on the [Arch Linux forums](https://bbs.archlinux.org/viewtopic.php?id=273528) and in an [Ubuntu bug report](https://lists.snapcraft.io/archives/foundations-bugs/2015-July/245147.html) have described Windows moving its boot manager back to first place.
6. If Windows keeps winning, run bcdedit /set {bootmgr} path \EFI\ubuntu\shimx64.efi as administrator so the Windows Boot Manager entry launches GRUB, replacing ubuntu with your distribution's folder. Use shimx64.efi rather than grubx64.efi when Secure Boot is on, per the [openSUSE forums](https://forums.opensuse.org/t/bricked-my-laptop-after-bios-update/103442?page=3).
7. Watch for Secure Boot changes. In August 2024 a Windows security update applied an SBAT policy blocking older GRUB builds to dual boot machines that Microsoft's detection missed, leaving them unable to start Linux. [Microsoft published recovery steps](https://learn.microsoft.com/windows/release-health/status-windows-11-22H2) and says its September 2024 and later updates do not include that setting.

With GRUB in front, Windows Boot Manager only runs when GRUB hands control to it.
