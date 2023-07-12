# Zehn
Zehn is a Steam skin based on Windows 10's Metro/Fluent transitional design language. It is currently a WIP, so some sections are not complete and may change at any time.

Why the name "Zehn"? Well, I wanted to make my own attempt to match Steam to a stock Windows 10 experience. The design language behind this OS is known as MDL2. It isn't quite the Metro of Windows 8 or the Fluent of Windows 11. Rather, it is a transitional design language that merges the sharp lines and minimalistic icons of Metro with effects such as Acrylic and Reveal that would later stay in Fluent. Unfortunately, some iconography of Fluent came into Windows 10 over the years through updates. If you're like me, you've managed to stop those updates from happening yet still be on 22H2. Both of these names were already used for other skins, but still neither quite fit anyways. So, I took the German word for "ten", as it also sounds like the Japanese "禅". My mind is clear knowing that this theme fits seamlessly into a Windows 10 environment.

Zehn is partly based on the [Metro](https://steamcommunity.com/groups/metroskin) skin, however everything has been re-made from the ground up in CSS. Reveal effects are courtesy of [FluentReveal](https://github.com/aleversn/FluentReveal). Thanks to [AikoMidori](https://github.com/AikoMidori/SteamSkins) for my introduction to JS in moving some classes around.

#### Installation
If you are using [SteamFriendsPatcher](https://github.com/PhantomGamers/SFP/releases), ensure that JavaScript support is enabled. This skin uses JS to move several elements around. As well, button reveal effects are done with JS. Please review the JS code before injection if you have received this skin from elsewhere.

Extract the root folder `Zehn` and place it in `~/Steam/steamui/skins`, and then select the skin in SFP.

### Customization
In the `~/Zehn/css/config.css` file you will find several configurable options, such as those to remove certain buttons like the Big Picture, VR, Add Game, Announcements, and such. As well, you can configure some colors. Zehn has separate background colors for settings windows and main client windows. As well, there is an overall accent color and the standard in-game and online colors.

In default colors, the in-game is styled to match the accent. If you haven't already noticed, this is themed after [fauux's site](https://fauux.neocities.org/).

#### Previews
Please note that the library in these previews does not yet exist. This is from my old skin, but it will return very much the same to appear as so.

![zehn](https://cdn.discordapp.com/attachments/729991202778251317/1128805252137754705/zehn.png)

![zehn settings](https://cdn.discordapp.com/attachments/729991202778251317/1128805258844442754/zehn-settings.png)

![zehn chat](https://cdn.discordapp.com/attachments/729991202778251317/1128813573045506198/zehn-chat.gif)