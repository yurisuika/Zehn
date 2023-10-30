# Zehn
Zehn is a Steam skin based on Windows 10's Metro/Fluent transitional design language.

This skin is currently a WIP, so some sections are not complete and may change at any time.

Why the name "Zehn"? Well, I wanted to make my own attempt to match Steam to a stock Windows 10 experience. The design language behind this OS is known as MDL2. It isn't quite the Metro of Windows 8 or the Fluent of Windows 11. Rather, it is a transitional design language that merges the sharp lines and minimalistic icons of Metro with effects such as Acrylic and Reveal that would later stay in Fluent. Unfortunately, some iconography of Fluent came into Windows 10 over the years through updates. If you're like me, you've managed to stop those updates from happening yet still be on 22H2. Both of these names were already used for other skins, but still neither quite fit anyways. So, I took the German word for "ten", as it also sounds like the Japanese "禅". My mind is clear knowing that this theme fits seamlessly into a Windows 10 environment.

Zehn is partly based on the [Metro](https://steamcommunity.com/groups/metroskin) skin, however everything has been re-made from the ground up in CSS. Reveal effects are courtesy of [FluentReveal](https://github.com/aleversn/FluentReveal). Thanks to [AikoMidori](https://github.com/AikoMidori/SteamSkins) for my introduction to JS in moving some classes around.

#### Installation
1. Download the [latest commit](https://github.com/yurisuika/Zehn/archive/refs/heads/master.zip).
2. Extract the archive `Zehn`.
3. Navigate to your Steam folder.
4. Place the extracted skin folder in `~/Steam/steamui/skins`.
5. Enable JavaScript support in your patcher of choice.
6. Select the skin in the patcher.

Currently this skin works fine on [SteamFriendsPatcher](https://github.com/PhantomGamers/SFP/releases). I have yet to resolve some patching issues with [Millennium](https://github.com/ShadowMonster99/millennium-steam-patcher/releases), including JS seemingly not loading and some menus not being skinned.

#### Customization
In the `~/Zehn/css/config.css` file you will find several configurable options, such as those to remove certain buttons like the Big Picture, VR, Add Game, Announcements, and such. As well, you can configure some colors. Zehn has separate background colors for settings windows and main client windows. As well, there is an overall accent color and the standard in-game and online colors which you may wish to change.

In default colors, the in-game is styled to match the accent. If you haven't already noticed, this is themed after [fauux's site](https://fauux.neocities.org/).

#### Things of Note
The library games list sidebar can be toggled by an added button. You will find this button on the sidebar when opened, and when closed in the bottom-right corner when the window is hovered. If the JS has failed to inject, then this button will not appear. As such, if you switch from the library to the downloads page, it will unload. I have yet to resolve this.

If things crash because of the class moving or fail to load, press F5 to refresh the client (this may require dev mode enabled).

Because Steam has chosen to not give unique classes to some things, you may notice repeated icons in some areas.

#### To-Do
- Overlay Web Browser
- Overlay Controller Settings
- Notifications
- Convert skin to live version so you don't need to download over and over
- Replace PNG icons with Segoe MDL2 Assets font glyphs or SVG maybe?
- Implement Reveal
- Figure out to implement Reveal on stuff that isn't initially loaded
- Figure out why text rendering is so much blurrier than in UWP apps???
- Figure out how to get JS to move classes again when reloaded and not just on initial load
- Maybe do browser content?
- Anything I haven't come across from daily use
- Wait for Steam to one day support :has selector so I may target unclassed SVGs

#### Previews
![zehn](https://cdn.discordapp.com/attachments/729991202778251317/1167158711073120297/zehn.png)

![zehn chat](https://cdn.discordapp.com/attachments/729991202778251317/1128813573045506198/zehn-chat.gif)