import Zehn from './js/zehn.js';

Zehn.addUserAgent();

Zehn.waitForElement('._1FyBL6obxHQ2Z2CsaV2Gbz').then((element) => {
  let cells = document.querySelectorAll('._1-vlriAtKYDViAEunue4VO');
  console.log(cells);
  [].forEach.call(cells, function (el) {
    if(el.innerText.indexOf('Privacy') !== -1) {
      el.style.backgroundImage = 'var(--icon-privacy)';
      console.log(el)
    }
    if(el.innerText.indexOf('Workshop') !== -1) {
      el.style.backgroundImage = 'var(--icon-store)';
      console.log(el)
    }
    if(el.innerText.indexOf('DLC') !== -1) {
      el.style.backgroundImage = 'var(--icon-shop)';
      console.log(el)
    }
    if(el.innerText.indexOf('Controller') !== -1) {
      el.style.backgroundImage = 'var(--icon-controller)';
      console.log(el)
    }
    if(el.innerText.indexOf('Betas') !== -1) {
      el.style.backgroundImage = 'var(--icon-update-dev)';
      console.log(el)
    }
    if(el.innerText.indexOf('Installed Files') !== -1) {
      el.style.backgroundImage = 'var(--icon-apps-all)';
      console.log(el)
    }
    if(el.innerText.indexOf('Updates') !== -1) {
      el.style.backgroundImage = 'var(--icon-update)';
      console.log(el)
    }
    if(el.innerText.indexOf('Compatibility') !== -1) {
      el.style.backgroundImage = 'var(--icon-switch)';
      console.log(el)
    }
    if(el.innerText.indexOf('General') !== -1) {
      el.style.backgroundImage = 'var(--icon-home)';
      console.log(el)
    }
    if(el.innerText.indexOf('Game Recording') !== -1) {
      el.style.backgroundImage = 'var(--icon-film)';
      console.log(el)
    }
  });
});

function addButton(target, button, buttonIcon, library, callback) {
  var btn = document.createElement('button');
  btn.classList.add('ZehnButton');
  btn.id = `${button}`;
  btn.type = 'button';
  btn.value = 'close';
  btn.name = 'button';
  btn.onclick = callback;
  if (library) {
    btn.classList.add('DialogButton');
    document.querySelector(`${target}`).append(btn);
  } else {
    document.querySelector(`${target}`).prepend(btn);
  }
  var icon = document.createElement('div');
  icon.id = `${buttonIcon}`;
  document.querySelector(`${target}`).querySelector(`#${button}`).append(icon);
};

function toggleSidebar() {
  if (document.getElementById('toggleSidebar') != null && document.getElementById('toggleLibrary') != null) {
    var btnSidebar = document.getElementById('toggleSidebar');
    var btnLibrary = document.getElementById('toggleLibrary');
    var sidebar = document.querySelector(`._9sPoVBFyE_vE87mnZJ5aB`);
    var buttons = document.querySelector(`._1ZS_xta5HMXzR8JgxDH6n7 ._2WgQEFvIzJw_SHNGbjtRFU`);
    btnSidebar.classList.add('RevealButton');
    if (btnSidebar.value == 'close') {
      btnSidebar.value = 'open';
      btnLibrary.value = 'open';
      btnLibrary.style.display = 'block';
      sidebar.style.setProperty('visibility', 'hidden', 'important');
      sidebar.style.setProperty('min-width', '0px', 'important');
      sidebar.style.setProperty('max-width', '0px', 'important');
      buttons.style.setProperty('min-width', '0px', 'important');
    }
    else if (btnSidebar.value = 'open') {
      btnSidebar.value = 'close';
      btnLibrary.value = 'close';
      btnLibrary.style.display = 'none';
      sidebar.style.setProperty('visibility', 'visible', 'important');
      if (navigator.userAgent.includes('Linux')) {
        sidebar.style.setProperty('min-width', 'calc(48px * 7)', 'important');
        sidebar.style.setProperty('max-width', 'calc(max(50%, 100% - (48px * 7)))', 'important');
      }
      else {
        sidebar.style.setProperty('min-width', 'calc(48px * 6)', 'important');
        sidebar.style.setProperty('max-width', 'calc(max(50%, 100% - (48px * 6)))', 'important');
      }
      buttons.style.setProperty('min-width', 'calc(48px * 4)', 'important');
    }
  }
};

function toggleDetails() {
  if (document.getElementById('toggleDetails') != null) {
    var btnDetails = document.getElementById('toggleDetails');
    var details = document.querySelector(`._2aor4XVOYzN1PBSREk0UbO`);
    var featured = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)`);
    var activity = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)`);
    if (btnDetails.value == 'close') {
      btnDetails.value = 'open';
      featured.style.setProperty('min-width', '66%', 'important');
      featured.style.setProperty('max-width', '66%', 'important');
      activity.style.setProperty('min-width', '66%', 'important');
      activity.style.setProperty('max-width', '66%', 'important');
      details.style.setProperty('display', 'flex', 'important');
    }
    else if (btnDetails.value = 'open') {
      btnDetails.value = 'close';
      featured.style.setProperty('min-width', '100%', 'important');
      featured.style.setProperty('max-width', '100%', 'important');
      activity.style.setProperty('min-width', '100%', 'important');
      activity.style.setProperty('max-width', '100%', 'important');
      details.style.setProperty('display', 'none', 'important');
    }
  }
};

function addButtonSidebar(target) {
  addButton(target, 'toggleSidebar', 'toggleSidebarIcon', false, toggleSidebar);
};

function addButtonLibrary(target) {
  addButton(target, 'toggleLibrary', 'toggleLibraryIcon', true, toggleSidebar);
};

function addButtonDetails(target) {
  addButton(target, 'toggleDetails', 'toggleDetailsIcon', false, toggleDetails);
};

Zehn.createButton('._2WgQEFvIzJw_SHNGbjtRFU', '#toggleSidebar', addButtonSidebar);
Zehn.createButton('._2Nq6ov7A1hGcHXVOXNt_OE', '#toggleLibrary', addButtonLibrary);
Zehn.createButton('._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '#toggleDetails', addButtonDetails);
Zehn.createButton('._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '#toggleDetails', addButtonDetails);

Zehn.moveAppend('._3cykd-VfN_xBxf3Qxriccm', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3mGEzzp18imtSzGPkduedi)', // NOTIFICATIONS
  '._1TdaAqMFadi0UTqilrkelR', // FRIENDS
  '._2EQ7ghgqIdjKv9jsQC0Zq9', // DOWNLOADS
  '._2foCkpRXhqq0UGVE50BWqj', // ADD GAME
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._5wILZhsLODVwGfcJ0hKmJ)', // ANNOUNCEMENTS
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3LKQ3S_yqrebeNLF6aeiog)' // BIG PICTURE
]);
Zehn.moveAppend('._3lRfTo8Wo3phXfE1DvK6QW', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(.Utdt7JrpIm5JlpQmqyj1v)' // VR
]);
Zehn.moveAppend('.Utdt7JrpIm5JlpQmqyj1v', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3lRfTo8Wo3phXfE1DvK6QW)' // SOUNDTRACK
]);
Zehn.moveAppend('._39oUCO1OuizVPwcnnv88no', '._39oUCO1OuizVPwcnnv88no', [
  '._3Z3ohQ8-1NKnCZkbS6fvy' // NAV
]);
Zehn.moveAppend('._2WgQEFvIzJw_SHNGbjtRFU', '._2WgQEFvIzJw_SHNGbjtRFU', [
  '._3AhYljPF4e4E8LaBt-FoY0' // SIDEBAR BUTTON LIBRARY
]);
Zehn.moveAppend('._2WgQEFvIzJw_SHNGbjtRFU', '._2WgQEFvIzJw_SHNGbjtRFU', [
  '._2CEKFex6JMsAse2lqMMjUp' // SIDEBAR BUTTON COLLECTIONS
]);
Zehn.movePrepend('.TabbedPopupBrowser .TitleBar.title-area', '.TabbedPopupBrowser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);
Zehn.movePrepend('.fbu3l7kPiBeb3EKCjIb8n', '.fi6UDkxJq66MLo2z9wabQ', [
  '.fbu3l7kPiBeb3EKCjIb8n' // OVERLAY BUTTONS
]);
Zehn.moveAppend('.DKXVRVBokaW_Xxo6kyKq0', '.DKXVRVBokaW_Xxo6kyKq0', [
  '._3-jI6bR_mj4JCTwXNFFuuL' // SCREENSHOT CAPTION
]);
Zehn.moveAppend('.LCeIT0gmFTY8fdfaVgk4j', '.LCeIT0gmFTY8fdfaVgk4j', [
  '._1fu6xumTI1nCY5wc6FG_N2' // NOTES DELETE
]);
Zehn.moveAppend('._1gvujtNl7v7FpJK6kaMeKZ', '._1gvujtNl7v7FpJK6kaMeKZ', [
  '._2yt71EY8-YdWa8dBEE1DAW' // ARTWORK DESCRIPTION
]);

// Zehn.createReveal('._1ZS_xta5HMXzR8JgxDH6n7', '.ZehnButton', 0);
// Zehn.createReveal('._1ZS_xta5HMXzR8JgxDH6n7', '._2PF_m-I5yte3WnQhpcz8RC', 0);
// Zehn.createReveal('._3AhYljPF4e4E8LaBt-FoY0', '._3AhYljPF4e4E8LaBt-FoY0', 0);
// Zehn.createReveal('._2CEKFex6JMsAse2lqMMjUp', '._2CEKFex6JMsAse2lqMMjUp', 0);
// Zehn.createReveal('._1ZS_xta5HMXzR8JgxDH6n7', '._3mzKdQXht__YHo6PX1LmB6', 0);
// Zehn.createReveal('._1ZS_xta5HMXzR8JgxDH6n7', '._3mzKdQXht__YHo6PX1LmB6', 1);