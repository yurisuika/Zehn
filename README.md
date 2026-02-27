# Zehn
Zehn is a Steam skin based on Windows 10's Metro/Fluent transitional design language. It comes in both dark and light modes!

Why the name "Zehn"? Well, I wanted to make my own attempt to match Steam to a stock Windows 10 experience. The design language behind this OS is known as MDL2, the first iteration of Fluent Design. It isn't quite the Metro of Windows 8 or the Fluent 2 of Windows 11. Rather, it is a transitional design language that retains the sharp lines and minimalistic icons of Metro and merges them with reactive Fluent effects such as Acrylic and Reveal that evolved into Fluent 2 for Windows 11. Both of these names were already used for other skins, but still neither quite fit anyways. So, I took the German word for "ten", as it also sounds like the Japanese "禅". My mind is clear knowing that this theme fits seamlessly into a Windows 10 environment.

![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/master/assets/zehn.png?raw=true)

<details>
  <summary>Dark Mode Previews</summary>

  ![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/master/assets/zehn-dark.png?raw=true)

</details>

<details>
  <summary>Light Mode Previews</summary>

  ![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/master/assets/zehn-light.png?raw=true)

</details>

### Customization
For Millennium, use the respective tabs under the theme's settings.

For SFP, you may edit the config in `~/config/options.json` to dynamically patch in options for the skin! Please reference the values in `~/skin.json` for now to know what they do. The skin folder must be named `Zehn` for this to work at the present time!

#### Colorization
You can colorize both the foreground and background colors of Zehn!

For Millennium, under the `Theme` tab, enable your choice of foreground and/or background blending. Optionally, set the blend amount and color space (different approaches to blending that produces different results). Under the `Colors` tab, choose the colors for blending and you've got a whole new look!

For SFP, edit the config in `~/config/options.json`!

#### Features
On Windows, the accent color will take your system's accent color by default. If you are on a system that does not support this variable, there is a fallback value. If you wish to change this, please manually enter the value in `~/config/theme/mode/<theme>/colors.css`.

Zehn features several added buttons for an improved experience:
* On the main window...
  * The root menu is toggled via the menu button in the upper-left corner of the navbar. It is hidden by default.
  * Theater Mode, which hides the game list sidebar, is toggled via the button in the navbar before the window controls.
  * Several search and filter related controls in library sidebar can be toggled via a button in the upper-left corner of the sidebar. These controls are hidden by default.
  * The What's New container in the library may be collapsed via the button next to the carousel controls.
  * Three buttons to select between displaying the Activity feed, the Community feed, and the Details panels for a game entry are found added to the playbar.
* On the friends list window...
  * The current user container is toggled via the menu button in the upper-left corner. It is hidden by default.

#### Versions
Zehn features both a static and a live version!

The [static version](https://github.com/yurisuika/Zehn/tree/master) contains the whole skin source. You will need to download the [latest release](https://github.com/yurisuika/Zehn/releases/latest) for any updates, which come often as rolling releases!

The [live version](https://github.com/yurisuika/Zehn/tree/live) references the latest static version on the web, so each time Steam is started or reloaded you will have the latest improvements. This version is recommended for most users as it infrequently requires updates.

#### Installation
1. Download your preferred version.
2. Extract the archive `Zehn`.
3. Navigate to your Steam folder.
4. Place the extracted skin folder in `~/steamui/skins`.
5. Enable JavaScript support in your patcher of choice.
6. Select the skin in the patcher.

Currently this skin works fine on both [SteamFriendsPatcher](https://github.com/PhantomGamers/SFP/releases) and [Millennium](https://github.com/ShadowMonster99/millennium-steam-patcher/releases).

#### Discussion
If you have inquires, you may use either [GitHub Discussions](https://github.com/yurisuika/Zehn/discussions) or join my modding [Discord](https://discord.gg/0zdNEkQle7Qg9C1H) server.