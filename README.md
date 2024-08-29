# Zehn
Zehn is a Steam skin based on Windows 10's Metro/Fluent transitional design language.

Why the name "Zehn"? Well, I wanted to make my own attempt to match Steam to a stock Windows 10 experience. The design language behind this OS is known as MDL2. It isn't quite the Metro of Windows 8 or the Fluent of Windows 11. Rather, it is a transitional design language that merges the sharp lines and minimalistic icons of Metro with effects such as Acrylic and Reveal that would later stay in Fluent. Unfortunately, some iconography of Fluent came into Windows 10 over the years through updates. If you're like me, you've managed to stop those updates from happening yet still be on 22H2. Both of these names were already used for other skins, but still neither quite fit anyways. So, I took the German word for "ten", as it also sounds like the Japanese "禅". My mind is clear knowing that this theme fits seamlessly into a Windows 10 environment.

#### Downloading
Zehn now features both a static and a live version! You can download both versions from the [latest release](https://github.com/yurisuika/Zehn/releases/latest)! A new release is created every day a commit is pushed and is updated every subsequent push for that day.

The static version contains the whole skin. You will need to download the latest release for any updates.

The live version references the static version, so each time Steam is started or reloaded you will have the latest changes and fixes applied! You will be able to receive the latest updates while not having to overwrite your config. This version is recommended for most users.

#### Installation
1. Download your preferred version.
2. Extract the archive `Zehn`.
3. Navigate to your Steam folder.
4. Place the extracted skin folder in `~/Steam/steamui/skins`.
5. Enable JavaScript support in your patcher of choice.
6. Select the skin in the patcher.

Currently this skin works fine on both [SteamFriendsPatcher](https://github.com/PhantomGamers/SFP/releases) and [Millennium](https://github.com/ShadowMonster99/millennium-steam-patcher/releases).

#### Customization
In the `~/config.css` file you will find several configurable options, such as those to remove certain titlebar control buttons for a more minimal appearance. As well, you can configure some colors. Zehn has separate background colors for dialog windows and main client windows. As well, there is an overall accent color and the standard in-game and online colors which you may wish to change.

On Windows, the accent color will take your system's accent color. If you are on a system that does not support this variable, please manually enter the value.

Zehn has added some text to the client, and as such the translatable strings are present in the config for your editing.

#### Things of Note
You can toggle the visibility of the current user container on the friends window using the navigation button in the upper-left corner.

The library games list sidebar can be toggled by an added button. You will find this button on the sidebar when opened, and when closed in the bottom-right corner when the window is hovered. If you switch from the library to the downloads page, it will unload, but you may get it back by pressing F5 to reload the client (this may require dev mode enabled). Possibly in the future I may figure out how to fix this.

If you are using Linux, you will want to install [some form of Segoe UI](https://github.com/abhayghatpande/segoe-fonts) for the best experience.

#### To-Do
- Figure out to implement Reveal on stuff that isn't initially loaded
- Figure out how to get JS to move classes again when reloaded and not just on initial load
- Maybe do browser content? (probably not)
- Anything I haven't come across from daily use

#### Thanks
- [Metro](https://steamcommunity.com/groups/metroskin) - The OG skin that brought Windows design language to Steam skinning!
- [AikoMidori](https://github.com/AikoMidori/SteamSkins) - I wrote my first lines of JS code learning from your skin.
- [SteamFriendsPatcher](https://github.com/PhantomGamers/SFP/releases) - For allowing this skin to work at all!
- [Millennium](https://github.com/ShadowMonster99/millennium-steam-patcher) - Another great skin patcher!
- [FluentReveal](https://github.com/aleversn/FluentReveal) - Provides the Reveal effect (not yet implemented).

#### Previews
![zehn](https://raw.githubusercontent.com/yurisuika/Zehn/master/assets/zehn.png?raw=true)