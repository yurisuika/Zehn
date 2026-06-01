# Zehn
Zehn is a Steam skin based on Windows 10's transitional design language. It comes in both dark and light modes with lots of customization!

Why the name "Zehn"? Well, I wanted to make my own attempt to match Steam to a stock Windows 10 experience. The design language behind this OS is technically known as MDL2, the first iteration of Fluent Design. It is a transitional design language that retains the sharp lines and minimalistic icons of Metro and merges them with reactive Fluent effects such as Acrylic and Reveal that evolved into Fluent 2 for Windows 11. So, I took the German word for "ten", as it also sounds like the Japanese "禅". My mind is clear knowing that this theme fits seamlessly into a Windows 10 environment.

![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/zehn.png)

----------

## Make Steam Look Like It Belongs in Windows 10

Part of the design philosophy behind Zehn is to only show what is always going to be relevant to your needs. The rest can be displayed when the ephemeral moment comes. Steam has a lot of visual clutter and redundancy, so Zehn seeks to alleviate you of this and let you navigate Steam without all the distraction. This is the elegent simplicity of Windows 10 Fluent Design that you love brought to Steam!

Some ways this is accomplished in Zehn:
* Most controls are consolidated into the navigation bar of the main Steam window. The root menu is only shown when you open it via the menu button.
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

----------

## What Does Zehn Offer?

### Customization
Zehn features various options to change the look and layout of the skin, including hiding and showing content, changing avatar style, and more.

There are several options that mirror settings in Windows 10, such as using transparency effects and showing the accent color on window borders. Along with the choice of light or dark mode, you can ensure Zehn matches your Windows 10 setup! You can even let Zehn automatically sync with your system mode!

Zehn is built on the foundation of variables to make broad-sweeping changes a breeze and offer a high degree of consistency. You can use Millennium's Quick CSS feature or modify `~/custom.css` on SFP to override these variables found in `~/css/variables.css`!

> [!NOTE]
> #### Millennium
> Use Millennium's Library Manager to select Zehn's options inside of Steam.
>
> #### SFP
> Edit the config in `~/options.json`. Please reference the [wiki](https://github.com/yurisuika/Zehn/wiki) to know what the values for each option may be.

### Color Blending
You can blend colors into both the foreground and background of Zehn. Give Steam more than just a native look, give it your look in either light or dark mode!

![color](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/color.png)

> [!NOTE]
> #### Millennium
> Configure color blending on the `Personalization` tab under the `Theme` subjection. Set the colors under the `Colors` tab.
>
> #### SFP
> Edit the config in `~/options.json` as usual. Set the colors in `~/config/colors.css`.

### Acrylic
Acrylic is a Fluent Design material that blurs the background of a surface with a translucent color along with a bit of noise. In Zehn, Acrylic is handled in two ways when `Transparency Effects` is enabled in the options.

Certain surfaces will always have an Acrylic blur on them. These are generally small panels that blur images behind them.

Some windows have reactive panels that change into an Acrylic surface on window focus. These fall into two categories:
* Panels that overlay and blur Steam content below them, such as the main window navbar.
* Panels that blur behind the window when focused, such as the settings windows. This requires the DWMX plugin for Millennium to work.

![acrylic](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/acrylic.gif)

> [!WARNING]
> Behind-window Acrylic may require additional compositing software to function. See the [Acrylic](https://github.com/yurisuika/Zehn/wiki/Acrylic) page on the wiki for a guide on how to get it to work!

### Reveal
Reveal is a Fluent Design effect that reveals hidden backgrounds and borders where you mouse over. When `Transparency Effects` is enabled, certain buttons, lists, and more are given Reveal!

![reveal](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/reveal.gif)

### Waifus
You can give your waifu a home in your library! Supports random image selection, adjustable placement, and more.

![waifu](https://raw.githubusercontent.com/yurisuika/Zehn/refs/heads/assets/waifu.png)

### Other Features
Zehn features several added buttons for an improved experience:
* On the library window...
  * The root menu is toggled via the menu button in the left end of the navbar. It is hidden by default.
  * Many navbar buttons that are simply redundant links that may be found in the root menus and supernav menus are collapsed until opened by a button added to the navbar buttons area.
  * Theater Mode, which hides the game list sidebar, can be enabled from a button added to the navbar buttons area.
  * Several search and filter related controls in library sidebar can be toggled via a button in the upper-left corner of the sidebar. These controls are hidden by default.
  * The What's New container in the library may be collapsed via the button next to the carousel controls.
  * Three buttons to select between displaying the Activity feed, the Community feed, and the Details panels for a game entry are found added to the playbar.
  * To match toggling the info panel on the game page, the game links panel may be toggled with a button added to the playbar.
* On the friends list window...
  * The header containers are toggled via the menu button in the upper-left corner. These are shown by default.
  * The current user container is toggled via the button at the ends of the friends tab buttons container. It is hidden by default.
* On the chat window...
  * The channel list, member list, and settings buttons are toggled via three buttons added to the group chat header bar.

### Plugin Support
Some Millennium plugins need a bit of styling to fit with Zehn. You can enjoy the following plugins made to look right at home in a Zehn Steam:
* Achievement Groups
  * Made to match the other achievement overlay tabs.
* Collections+
* Easy SteamGrid
* Extendium
  * Browser bar buttons, extensions context menus, and settings dialogs all skinned.
* Gratitude
* HLTB for Steam
  * Game page stats made to look like the collections tags.
  * Millennium settings options styled to the best that they can be with Chromium 126, so it looks a bit naff.
* Size on Disk
* Window Styler (DWMX)
  * When Transparency Effects is enabled in the settings, certain windows can have Acrylic blur behind them.

----------

## Getting Zehn

### Installation
1. Download the latest release of Zehn and extract the archive.
3. Navigate to your Steam installation.
4. Move the extracted Zehn folder into the proper Steam directory.
  - For Millennium 2.x or SFP, this folder is `~/steamui/skins`.
  - For Millennium 3.x and up, this folder is `~/millennium/themes`.
5. Enable JavaScript and CSS injection in your patcher of choice.
6. Select Zehn in your patcher and enjoy!

Zehn supports both [SteamFriendsPatcher](https://github.com/PhantomGamers/SFP/releases) and [Millennium](https://github.com/ShadowMonster99/millennium-steam-patcher/releases).

### Documentation
For in-depth documentation, see the [wiki](https://github.com/yurisuika/Zehn/wiki)!

Check out the [Announcements](https://github.com/yurisuika/Zehn/discussions/categories/announcements) discussions for details on recent major updates.

Work in progress is also documented in the [Previews](https://github.com/yurisuika/Zehn/discussions/categories/previews) discussions. Find out what is being worked on and learn what is up-and-coming for Zehn!

### Support and Community
Head on over to [Support](https://github.com/yurisuika/Zehn/discussions/categories/support) if you need help!

Join the new [Steam Group](https://steamcommunity.com/groups/zehntheme) and drop into the chat room!