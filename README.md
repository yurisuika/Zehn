# Zehn
Zehn is a Steam skin based on Windows 10's Metro/Fluent transitional design language. It comes in both dark and light modes!

Why the name "Zehn"? Well, I wanted to make my own attempt to match Steam to a stock Windows 10 experience. The design language behind this OS is known as MDL2. It isn't quite the Metro of Windows 8 or the Fluent of Windows 11. Rather, it is a transitional design language that merges the sharp lines and minimalistic icons of Metro with Fluent effects such as Acrylic and Reveal that would later stay in Fluent 2 for Windows 11. Unfortunately, some iconography of Fluent 2 came into Windows 10 over the years through updates. If you're like me, you've managed to stop those updates from happening yet still be on 22H2. Both of these names were already used for other skins, but still neither quite fit anyways. So, I took the German word for "ten", as it also sounds like the Japanese "禅". My mind is clear knowing that this theme fits seamlessly into a Windows 10 environment.

![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/master/assets/zehn.png?raw=true)

<details>
  <summary>Dark Mode Previews</summary>

  ![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/master/assets/zehn-dark.png?raw=true)

</details>

<details>
  <summary>Light Mode Previews</summary>

  ![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/master/assets/zehn-light.png?raw=true)

</details>

#### Versions
Zehn features both a static and a live version!

The [static version](https://github.com/yurisuika/Zehn/tree/master) contains the whole skin source. You will need to download the [latest release](https://github.com/yurisuika/Zehn/releases/latest) for any updates, which come often as rolling releases!

The [live version](https://github.com/yurisuika/Zehn/tree/live) references the latest static version on the web, so each time Steam is started or reloaded you will have the latest improvements while not having to overwrite your config. This is only updated when configurable options have changed. This version is recommended for most users.

#### Installation
1. Download your preferred version.
2. Extract the archive `Zehn`.
3. Navigate to your Steam folder.
4. Place the extracted skin folder in `~/steamui/skins`.
5. Enable JavaScript support in your patcher of choice.
6. Select the skin in the patcher.

Currently this skin works fine on both [SteamFriendsPatcher](https://github.com/PhantomGamers/SFP/releases) and [Millennium](https://github.com/ShadowMonster99/millennium-steam-patcher/releases).

#### Customization
Zehn now supports Millennium's built-in configuration screen! You may select both config options and use the color editor from it. Some variables deemed not necessary to be turned into options may still be found in the `~/css/variables/` folder.

#### Features
On Windows, the accent color will take your system's accent color by default. If you are on a system that does not support this variable, there is a fallback value. If you wish to change this, please manually enter the value in `~/css/config/theme/<theme>/colors.css`.

Zehn features several added buttons for an improved experience:
* You can toggle the visibility of the current user container on the friends window using the navigation button in the upper-left corner.
* The library sidebar can be toggled by an added button. You will find this button on the sidebar when opened and in the bottom-right corner when closed while the window is focused and hovered.
* The game page details panel is hidden by default. A button has been added to the playbar to toggle it.

Zehn uses Windows 10's Segoe UI for the most seamless experience. If you are using Linux, you will want to install [some form of Segoe UI](https://github.com/abhayghatpande/segoe-fonts) for the best experience.

#### Discussion
If you have inquires, you can use either [GitHub Discussions](https://github.com/yurisuika/Zehn/discussions) or come by my [Discord](https://discord.gg/0zdNEkQle7Qg9C1H).