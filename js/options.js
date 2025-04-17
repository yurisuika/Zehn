const Options = {
  setOptions() {
    if (!document.documentElement.classList.contains('core') && !document.documentElement.classList.contains('responsive')) {
      fetch('https://steamloopback.host/skins/Zehn/config/options.json').then((response) => response.json()).then(
        (options) => {
          // THEME -------------------------------------------------------------
          if (options.theme.mode == "dark") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/mode/dark/theme.css"/>');
            document.write('<script type="text/javascript" src="https://steamloopback.host/skins/Zehn/config/theme/mode/dark/theme.js"></' + 'script>');
          } else if (options.theme.mode == "light") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/mode/light/theme.css"/>');
            document.write('<script type="text/javascript" src="https://steamloopback.host/skins/Zehn/config/theme/mode/light/theme.js"></' + 'script>');
          }

          if (options.theme.auto) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/auto/enable.css"/>');
          }

          if (options.theme.blend.color.background) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/color/background/enable.css"/>');
          }

          if (options.theme.blend.color.foreground) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/color/foreground/enable.css"/>');
          }

          if (options.theme.blend.amount == "0%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/0%.css"/>');
          } else if (options.theme.blend.amount == "25%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/25%.css"/>');
          } else if (options.theme.blend.amount == "50%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/50%.css"/>');
          } else if (options.theme.blend.amount == "75%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/75%.css"/>');
          } else if (options.theme.blend.amount == "100%") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/amount/100%.css"/>');
          }

          if (options.theme.blend.space == "srgb") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/space/srgb.css"/>');
          } else if (options.theme.blend.space == "lab") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/space/lab.css"/>');
          } else if (options.theme.blend.space == "oklab") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/theme/blend/space/oklab.css"/>');
          }

          // GENERAL -----------------------------------------------------------
          if (options.general.reveal) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/reveal/enable.css"/>');
            document.write('<script type="text/javascript" src="https://steamloopback.host/skins/Zehn/config/general/reveal/enable.js"></' + 'script>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/reveal/disable.css"/>');
          }

          if (options.general.avatar == "round") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/avatar/round.css"/>');
          } else if (options.general.avatar == "square") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/avatar/square.css"/>');
          }

          if (options.general.blur == "light") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/blur/light.css"/>');
          } else if (options.general.blur == "normal") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/blur/normal.css"/>');
          } else if (options.general.blur == "heavy") {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/blur/heavy.css"/>');
          }

          if (options.general.scrollbars) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/scrollbars/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/general/scrollbars/hide.css"/>');
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

          // CHAT --------------------------------------------------------------
          if (options.chat.timeDivisions) {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/chat/time divisions/show.css"/>');
          } else {
            document.head.insertAdjacentHTML('beforebegin', '<link rel="stylesheet" href="https://steamloopback.host/skins/Zehn/config/chat/time divisions/hide.css"/>');
          }
        }
      );
    }
  }
};

export default Options;