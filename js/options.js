const Options = {
  setOptions() {
    if (!Array.from(document.documentElement.classList).some(className => className.startsWith(`MillenniumWindow_`)) && !document.documentElement.classList.contains('responsive')) {
      fetch('https://steamloopback.host/skins/Zehn/config/options.json').then((response) => response.json()).then(
        (options) => {
          // THEME -------------------------------------------------------------
          if (options.theme.mode == "auto") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/mode/auto.css"/>');
          } else if (options.theme.mode == "dark") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/mode/dark.css"/>');
          } else if (options.theme.mode == "light") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/mode/light.css"/>');
          }

          if (options.theme.accent.borders) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/accent/borders/enable.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/accent/borders/disable.css"/>');
          }

          if (options.theme.accent.blend.background) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/accent/blend/background/enable.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/accent/blend/background/disable.css"/>');
          }

          if (options.theme.accent.blend.foreground) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/accent/blend/foreground/enable.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/accent/blend/foreground/disable.css"/>');
          }

          if (options.theme.blend.amount.background == "0%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/background/0%.css"/>');
          } else if (options.theme.blend.amount.background == "25%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/background/25%.css"/>');
          } else if (options.theme.blend.amount.background == "50%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/background/50%.css"/>');
          } else if (options.theme.blend.amount.background == "75%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/background/75%.css"/>');
          } else if (options.theme.blend.amount.background == "100%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/background/100%.css"/>');
          }

          if (options.theme.blend.amount.foreground == "0%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/foreground/0%.css"/>');
          } else if (options.theme.blend.amount.foreground == "25%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/foreground/25%.css"/>');
          } else if (options.theme.blend.amount.foreground == "50%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/foreground/50%.css"/>');
          } else if (options.theme.blend.amount.foreground == "75%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/foreground/75%.css"/>');
          } else if (options.theme.blend.amount.foreground == "100%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/foreground/100%.css"/>');
          }

          if (options.theme.blend.space == "srgb") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/space/srgb.css"/>');
          } else if (options.theme.blend.space == "lab") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/space/lab.css"/>');
          } else if (options.theme.blend.space == "oklab") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/space/oklab.css"/>');
          }

          // GENERAL -----------------------------------------------------------
          if (options.general.avatar == "round") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/avatar/round.css"/>');
          } else if (options.general.avatar == "square") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/avatar/square.css"/>');
          }

          if (options.general.scrollbars  == "none") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/scrollbars/none.css"/>');
          } else if (options.general.scrollbars  == "windows") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/scrollbars/windows.css"/>');
          } else if (options.general.scrollbars  == "steam") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/scrollbars/steam.css"/>');
          }

          if (options.general.tooltips) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/tooltips/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/tooltips/hide.css"/>');
          }

          // NAVIGATION --------------------------------------------------------
          if (options.navigation.accountAvatar) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/account avatar/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/account avatar/hide.css"/>');
          }

          if (options.navigation.announcements) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/announcements/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/announcements/hide.css"/>');
          }

          if (options.navigation.addGame) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/add game/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/add game/hide.css"/>');
          }

          if (options.navigation.vr) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/vr/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/vr/hide.css"/>');
          }

          if (options.navigation.bigPicture) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/big picture/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/big picture/hide.css"/>');
          }

          if (options.navigation.urlBar) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/url bar/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/url bar/hide.css"/>');
          }

          if (options.navigation.downloadBar == "narrow") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/download bar/narrow.css"/>');
          } else if (options.navigation.downloadBar == "normal") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/download bar/normal.css"/>');
          } else if (options.navigation.downloadBar == "wide") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/navigation/download bar/wide.css"/>');
          }

          // LIBRARY -----------------------------------------------------------
          if (options.library.mascot) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/mascot/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/mascot/hide.css"/>');
          }

          if (options.library.mascotType == "gif") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/mascot type/gif.css"/>');
          } else if (options.library.mascotType == "jpg") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/mascot type/jpg.css"/>');
          } if (options.library.mascotType == "png") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/mascot type/png.css"/>');
          }

          if (options.library.addShelf) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/add shelf/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/add shelf/hide.css"/>');
          }

          if (options.library.whatsNew) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/whats new/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/library/whats new/hide.css"/>');
          }
        }
      );
    }
  }
};

export default Options;