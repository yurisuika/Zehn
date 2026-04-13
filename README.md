# Zehn
Zehn is a Steam skin based on Windows 10's Metro/Fluent transitional design language. It comes in both dark and light modes with lots of customization!

Why the name "Zehn"? Well, I wanted to make my own attempt to match Steam to a stock Windows 10 experience. The design language behind this OS is known as MDL2, the first iteration of Fluent Design. It isn't quite the Metro of Windows 8 or the Fluent 2 of Windows 11. Rather, it is a transitional design language that retains the sharp lines and minimalistic icons of Metro and merges them with reactive Fluent effects such as Acrylic and Reveal that evolved into Fluent 2 for Windows 11. Both of these names were already used for other skins, but still neither quite fit anyways. So, I took the German word for "ten", as it also sounds like the Japanese "禅". My mind is clear knowing that this theme fits seamlessly into a Windows 10 environment.

![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/zehn.png)

## Make Steam Look Like A Native App!

Part of the design philosophy behind Zehn is to de-clutter Steam. Not everything needs to be thrown in your face at once. Why take up more space than is really needed?

Some ways this is accomplished in Zehn:
* Much is consolidated into the navigation bar in the main Steam window. The root menu is only shown when you open it via the menu button.
* Instead of a details sidebar always shown and a community content feed that you can only access after scrolling past all of the activity feed on a game page, Zehn offers three simple buttons in the play bar to switch between displaying these. You can focus solely on that of which you choose!
* The game search is hidden by default; once you set up a bunch of filters, you don't need to constantly see their tags and other filter buttons displayed, so you can hide the search section and still retain its functionality while giving the list center stage.
* You can toggle showing your own status and the friends search from the buttons bar. And you can even hide that bar as well to just view your contacts. Garner the ability to only view what matters most.
* Steam natively allows the chat channel list to be pinned open or collapsed, but Zehn takes it a step further and allows you to completely hide it. Additionally, the members list is displayed as an overlay that is only shown when you need it.
> [!TIP]
> Check out these extended previews to see more of Zehn! 
>
> <details>
>   <summary>Dark Mode</summary>
>
>   #### Main
>   ![main](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/main.png)
>
>   #### Friends
>   ![friends](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/friends.png)
>
>   #### Chat
>   ![chat](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/chat.png)
>
>   #### Media
>   ![media](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/media.png)
>
>   #### Settings
>   ![settings](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/settings.png)
>
>   #### Notes
>   ![notes](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/notes.png)
>
>   #### Servers
>   ![servers](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/servers.png)
>
>   #### Browser
>   ![browser](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/browser.png)
>
>   #### Overlay
>   ![overlay](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/dark/overlay.png)
>
> </details>
>
> <details>
>   <summary>Light Mode</summary>
>
>   #### Main
>   ![main](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/main.png)
>
>   #### Friends
>   ![friends](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/friends.png)
>
>   #### Chat
>   ![chat](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/chat.png)
>
>   #### Media
>   ![media](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/media.png)
>
>   #### Settings
>   ![settings](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/settings.png)
>
>   #### Notes
>   ![notes](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/notes.png)
>
>   #### Servers
>   ![servers](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/servers.png)
>
>   #### Browser
>   ![browser](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/browser.png)
>
>   #### Overlay
>   ![overlay](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/light/overlay.png)
> 
> </details>

Zehn styles every control in either a dialog style or an app style. When opening a dialog, you are looking to get something done, so things like buttons and dropdowns are very distinct. But for windows that you will usually have open all the time, like the library or chat, controls displayed don't try to fight for your attention, but instead meld with the panel that they are part of. Evenly sized controls flow into eachother. Simple iconography is weighted proportionally with the typeface. This is the elegent simplicity of Windows 10 Fluent Design that you love brought to Steam!

## What Does Zehn Offer?

### Customization
Zehn features various options to change the look and layout of the skin, including hiding and showing content, changing avatar style, and more.

There are several options that mirror settings in Windows 10, such as using transparency effects and showing the accent color on window borders.

You can also choose between using light or dark mode, or let Zehn sync with your system in auto mode!

> [!NOTE]
> #### Millennium
> Use Millennium's Library Manager to select Zehn's options inside of Steam. You will be prompted to reload Steam when done.
>
> #### SFP
> Edit the config in `~/config/options.json` to dynamically patch in options for the skin! Please reference the values in `~/skin.json` for now to know what they do. The skin folder must be named `Zehn` for this to work at the present time!

> [!IMPORTANT]
> Please note that if you are not using Millennium, you must now set the `enable` option to `true` in `options.json`, and vice versa. This is to prevent the JSON config patches from being injected in addition to the patches already selected through Millennium's own settings system.

### Colorization
You can colorize both the foreground and background of Zehn! Give Steam more than just a native look, give it your look!

Choose between using your accent color or custom colors and how much color you want blended with Zehn in either light or dark mode!

![color](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/color.png)

> [!NOTE]
> #### Millennium
> Configure color blending under the `Theme` tab. You may manually set the colors under the `Colors` tab.
>
> #### SFP
> Edit the config in `~/config/options.json` as usual. Set the colors in `~/config/colors.css`.

### Acrylic
Acrylic is a Fluent Design material that blurs the background with a translucent color along with a bit of noise. In Zehn, Acrylic is handled in two ways.

Certain surfaces will always have an acrylic blur on them. These are small panels that blur content within a window. You'll often find this below details and descriptions laid atop of images.

Some windows have reactive panels that change into an acrylic blur on window focus when `Transparency Effects` is enabled in the options. These fall into two categories:
* Panels that overlay and blur Steam content below them, such as the main window navbar.
* Panels that blur the window background. These include various settings windows, notes, friends and chat. Of these, some are supported to give Steam a transparent background when using the DWMX plugin for Millennium. This allows the Acrylic to actually show through below the window and blur whatever is below it. You may need additional software to get a blur working, as at this time DWMX's blur is noted to not work (I recommend using Windhawk's `Translucent Windows` mod). Presently, the only windows that support this functionality are the pagelisted settings windows.

![acrylic](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/acrylic.png)

### Reveal
Reveal is a Fluent Design effect that reveals some hidden details to certain controls in a radial gradient around the mouse pointer.

In Zehn, when `Transparency Effects` is enabled, controls in several primary panels are given a Reveal effect. This includes the following:
* On the library window...
  * Game page playbar.
  * Game list sidebar controls panel.
* On the friends list window...
  * Controls panel.
* On the chat window...
  * Group chat header controls panel.
* On the media window...
  * Screenshots/recordings library controls panel.
* On the server list window...
  * Controls panel.

![reveal](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/reveal.png)

### Mascots
You can give your waifu a home in your library by adding a mascot in Steam's UI folder.

Your mascot will display when you are not hovering over the main library content, and fade away when you need to use it.

![waifu](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/waifu.png)

> [!IMPORTANT]
> From the Steam directory, place your `waifu` image in `~/steamui/mascots/` and enjoy.
>
> Supports JPG, GIF, and PNG file types (you must set the file type in the settings).

### Features
On Windows, Zehn's accent color will use your system's accent color by default. If you are on a system that does not support this variable, there is a fallback value. If you wish to override the system accent color, you may do so in the Millennium settings. If using SFP, please manually override the accent variables near the start of `~/css/variables.css`.

Zehn features several added buttons for an improved experience:
* On the library window...
  * The root menu is toggled via the menu button in the upper-left corner of the navbar. It is hidden by default.
  * Theater Mode, which hides the game list sidebar, is toggled via the button in the navbar before the window controls.
  * Several search and filter related controls in library sidebar can be toggled via a button in the upper-left corner of the sidebar. These controls are hidden by default.
  * The What's New container in the library may be collapsed via the button next to the carousel controls.
  * Three buttons to select between displaying the Activity feed, the Community feed, and the Details panels for a game entry are found added to the playbar.
* On the friends list window...
  * The header containers are toggled via the menu button in the upper-left corner. These are shown by default.
  * The current user container is toggled via the button at the ends of the friends tab buttons container. It is hidden by default.
* On the chat window...
  * The channel list, member list, and settings buttons are toggled via three buttons added to the group chat header bar.

> [!WARNING]
> On occasion, Millennium will fail to inject JS in the friends/chat windows. This means the added buttons fail to appear. You will have to F5 Steam until they show up.

### Plugin Support
You can enjoy support for the following plugins while using Zehn:
* Achievement Groups
  * Completely skinned to match the other achievement overlay tabs.
* Collections+
  * Ensured to work with Zehn.
* Window Styler (DWMX)
  * When Transparency Effects is enabled in the settings, certain windows can have Acrylic blur behind them.
* Extendium
  * Browser bar buttons, extensions context menus, and settings dialogs all skinned.
* Gratitude
  * Playbar icon skinned.
* Size on Disk
  * Playbar icon skinned.

## Getting Zehn

### Versions
Zehn features both a static and a live version!

The [static version](https://github.com/yurisuika/Zehn/tree/master) contains the whole skin source. You will need to download the skin for any updates, which come often as rolling releases! This version is recommended for users using a self-updating theme patcher.

The [live version](https://github.com/yurisuika/Zehn/tree/live) references the latest static version on the web, so each time Steam is started or reloaded you will have the latest improvements. As this version only requires updating when patches and settings are changed, this is recommended for users without a self-updating skin patcher.

### Installation
1. Download your preferred version.
2. Extract the archive `Zehn`.
3. Navigate to your Steam folder.
4. Place the extracted skin folder in `~/steamui/skins`.
5. Enable JavaScript support in your patcher of choice.
6. Select the skin in the patcher.

Currently this skin works fine on both [SteamFriendsPatcher](https://github.com/PhantomGamers/SFP/releases) and [Millennium](https://github.com/ShadowMonster99/millennium-steam-patcher/releases).

### Update Documentation
See Zehn's [Announcements](https://github.com/yurisuika/Zehn/discussions/categories/announcements) category in Discussions for details on recent updates! Noteable fixes, changes, and additions are described here, so you can know all about the latest improvements to Zehn.

### Support and Community
Head over to [Discussions](https://github.com/yurisuika/Zehn/discussions) for support, to share your ideas, and more!

~~[Yuri's Modding Lair Discord](https://discord.gg/0zdNEkQle7Qg9C1H)~~ is closed for the foreseeable future.