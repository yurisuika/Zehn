import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

Zehn.addUserAgent();

Options.setOptions();

function toggleNavigation() {
  var btnNavigation = document.getElementById('toggleNavigation');

  if (btnNavigation != null) {

    var root = document.querySelectorAll(`._2UyOBeiSdBayaFdRa39N2O`);
    var nav = document.querySelector(`._2D64jIEK7wpUR_NlObDW76`);
    var bar = document.querySelector(`._3Z7VQ1IMk4E3HsHvrkLNgo`);

    if (btnNavigation.classList.contains(`zehnToggled`)) {
      bar.classList.remove('zehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-menu-height', '0px');
      root.forEach((element) => {
        element.style.setProperty('height', '0px', 'important');
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('color', 'transparent', 'important');
        element.classList.add('rootHidden');
        element.classList.toggle('rootShown');
      });
    }
    else {
      bar.classList.add('zehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-menu-height', '32px');
      root.forEach((element) => {
        element.style.setProperty('height', '32px', 'important');
        element.style.setProperty('display', 'block', 'important');
        element.style.setProperty('color', 'var(--zehn-color-text-primary)', 'important');
        element.classList.add('rootShown');
        element.classList.toggle('rootHidden');
      });
    }

    btnNavigation.classList.toggle('zehnToggled');
  }
};

function toggleSidebar() {
  var btnSidebar = document.getElementById('toggleSidebar');
  var btnLibrary = document.getElementById('toggleLibrary');

  if (btnSidebar != null && btnLibrary != null) {
    var sidebar = document.querySelector(`._9sPoVBFyE_vE87mnZJ5aB`);
    var buttons = document.querySelector(`._1ZS_xta5HMXzR8JgxDH6n7 ._2WgQEFvIzJw_SHNGbjtRFU`);

    btnLibrary.classList.add('DialogButton');
    if (btnLibrary.classList.contains(`zehnToggled`)) {
      btnLibrary.style.display = 'none';
      sidebar.style.setProperty('visibility', 'visible', 'important');
      if (navigator.userAgent.includes('Linux')) {
        sidebar.style.setProperty('min-width', 'calc(48px * 7)', 'important');
        sidebar.style.setProperty('max-width', 'calc(max(40%, (48px * 7)))', 'important');
      }
      else {
        sidebar.style.setProperty('min-width', 'calc(48px * 6)', 'important');
        sidebar.style.setProperty('max-width', 'calc(max(40%, (48px * 6)))', 'important');
      }
      sidebar.style.setProperty('transform', 'scaleX(1)', 'important');
      buttons.style.setProperty('min-width', 'calc(48px * 4)', 'important');
    }
    else {
      btnLibrary.style.display = 'block';
      sidebar.style.setProperty('visibility', 'hidden', 'important');
      sidebar.style.setProperty('min-width', '0px', 'important');
      sidebar.style.setProperty('max-width', '0px', 'important');
      sidebar.style.setProperty('transform', 'scaleX(0)', 'important');
      buttons.style.setProperty('min-width', '0px', 'important');
    }

    btnSidebar.classList.toggle('zehnToggled');
    btnLibrary.classList.toggle('zehnToggled');
  }
};

function toggleWhatsNew() {
  var btnWhatsNew = document.getElementById('toggleWhatsNew');

  if (btnWhatsNew != null) {
    var whatsNew = document.querySelector(`._17uEBe5Ri8TMsnfELvs8-N .SMWMsB-gz3WbYRK2HOm7i > div:last-child`);

    if (btnWhatsNew.classList.contains(`zehnToggled`)) {
      whatsNew.style.setProperty('max-height', '300px', 'important');
      whatsNew.style.setProperty('opacity', '1', 'important');
    }
    else {
      whatsNew.style.setProperty('max-height', '0', 'important');
      whatsNew.style.setProperty('opacity', '0', 'important');
    }
    btnWhatsNew.classList.toggle('zehnToggled');
  }
};

function toggleActivity() {
  var btnActivitySticky = document.getElementById('toggleActivitySticky');
  var btnActivity = document.getElementById('toggleActivity');
  var btnCommunitySticky = document.getElementById('toggleCommunitySticky');
  var btnCommunity = document.getElementById('toggleCommunity');
  var btnDetailsSticky = document.getElementById('toggleDetailsSticky');
  var btnDetails = document.getElementById('toggleDetails');

  if (btnActivity != null && btnCommunity != null && btnDetails != null) {

    var featured = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)`);
    var event = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)`);
    var community = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)`);
    var details = document.querySelector(`._2aor4XVOYzN1PBSREk0UbO`);

    if (featured.hasChildNodes()) {
      featured.style.setProperty('display', 'block', 'important');
    }
    event.style.setProperty('display', 'block', 'important');
    community.style.setProperty('display', 'none', 'important');
    details.style.setProperty('display', 'none', 'important');

    btnActivitySticky.classList.add('zehnToggled');
    btnActivity.classList.add('zehnToggled');
    btnCommunitySticky.classList.remove('zehnToggled');
    btnCommunity.classList.remove('zehnToggled');
    btnDetailsSticky.classList.remove('zehnToggled');
    btnDetails.classList.remove('zehnToggled');
  }
};

function toggleCommunity() {
  var btnActivitySticky = document.getElementById('toggleActivitySticky');
  var btnActivity = document.getElementById('toggleActivity');
  var btnCommunitySticky = document.getElementById('toggleCommunitySticky');
  var btnCommunity = document.getElementById('toggleCommunity');
  var btnDetailsSticky = document.getElementById('toggleDetailsSticky');
  var btnDetails = document.getElementById('toggleDetails');

  if (btnActivity != null && btnCommunity != null && btnDetails != null) {

    var featured = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)`);
    var event = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)`);
    var community = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)`);
    var details = document.querySelector(`._2aor4XVOYzN1PBSREk0UbO`);

    featured.style.setProperty('display', 'none', 'important');
    event.style.setProperty('display', 'none', 'important');
    community.style.setProperty('display', 'block', 'important');
    details.style.setProperty('display', 'none', 'important');

    btnActivitySticky.classList.remove('zehnToggled');
    btnActivity.classList.remove('zehnToggled');
    btnCommunitySticky.classList.add('zehnToggled');
    btnCommunity.classList.add('zehnToggled');
    btnDetailsSticky.classList.remove('zehnToggled');
    btnDetails.classList.remove('zehnToggled');
  }
};

function toggleDetails() {
  var btnActivitySticky = document.getElementById('toggleActivitySticky');
  var btnActivity = document.getElementById('toggleActivity');
  var btnCommunitySticky = document.getElementById('toggleCommunitySticky');
  var btnCommunity = document.getElementById('toggleCommunity');
  var btnDetailsSticky = document.getElementById('toggleDetailsSticky');
  var btnDetails = document.getElementById('toggleDetails');

  if (btnActivity != null && btnCommunity != null && btnDetails != null) {

    var featured = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)`);
    var event = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)`);
    var community = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)`);
    var details = document.querySelector(`._2aor4XVOYzN1PBSREk0UbO`);

    featured.style.setProperty('display', 'none', 'important');
    event.style.setProperty('display', 'none', 'important');
    community.style.setProperty('display', 'none', 'important');
    details.style.setProperty('display', 'flex', 'important');

    btnActivitySticky.classList.remove('zehnToggled');
    btnActivity.classList.remove('zehnToggled');
    btnCommunitySticky.classList.remove('zehnToggled');
    btnCommunity.classList.remove('zehnToggled');
    btnDetailsSticky.classList.add('zehnToggled');
    btnDetails.classList.add('zehnToggled');
  }
};

function addButtonNavigation(target) {
  Zehn.addButton(target, 'toggleNavigation', 'toggleNavigationIcon', false, toggleNavigation);
};

function addButtonActivitySticky(target) {
  Zehn.addButton(target, 'toggleActivitySticky', 'toggleActivityIconSticky', false, toggleActivity);
};

function addButtonActivity(target) {
  Zehn.addButton(target, 'toggleActivity', 'toggleActivityIcon', false, toggleActivity);
};

function addButtonCommunitySticky(target) {
  Zehn.addButton(target, 'toggleCommunitySticky', 'toggleCommunityIconSticky', false, toggleCommunity);
};

function addButtonCommunity(target) {
  Zehn.addButton(target, 'toggleCommunity', 'toggleCommunityIcon', false, toggleCommunity);
};

function addButtonDetailsSticky(target) {
  Zehn.addButton(target, 'toggleDetailsSticky', 'toggleDetailsIconSticky', false, toggleDetails);
  document.getElementById('toggleDetailsSticky').classList.add('zehnToggled');
};

function addButtonDetails(target) {
  Zehn.addButton(target, 'toggleDetails', 'toggleDetailsIcon', false, toggleDetails);
    document.getElementById('toggleDetails').classList.add('zehnToggled');
};

function addButtonWhatsNew(target) {
  Zehn.addButton(target, 'toggleWhatsNew', 'toggleWhatsNewIcon', true, toggleWhatsNew);
};

function addButtonSidebar(target) {
  Zehn.addButton(target, 'toggleSidebar', 'toggleSidebarIcon', false, toggleSidebar);
};

function addButtonLibrary(target) {
  Zehn.addButton(target, 'toggleLibrary', 'toggleLibraryIcon', true, toggleSidebar);
};

Zehn.createElement('._3s0lkohH8wU2do0K1il28Y', '#toggleNavigation', addButtonNavigation);

Zehn.createElement('.QsvsRVwbsApgKt1MhM0fz:has(._3Z3ohQ8-1NKnCZkbS6fvy) ._2WgQEFvIzJw_SHNGbjtRFU', '#toggleSidebar', addButtonSidebar);
Zehn.createElement('.QsvsRVwbsApgKt1MhM0fz:has(._3Z3ohQ8-1NKnCZkbS6fvy) ._2Nq6ov7A1hGcHXVOXNt_OE', '#toggleLibrary', addButtonLibrary);

Zehn.createElement('._17uEBe5Ri8TMsnfELvs8-N .SMWMsB-gz3WbYRK2HOm7i ._2o5c89vAnrXN8C60QTSMqO > div:nth-child(2)', '#toggleWhatsNew', addButtonWhatsNew);

Zehn.createElement('._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '#toggleDetailsSticky', addButtonDetailsSticky);
Zehn.createElement('._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '#toggleDetails', addButtonDetails);
Zehn.createElement('._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '#toggleCommunitySticky', addButtonCommunitySticky);
Zehn.createElement('._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '#toggleCommunity', addButtonCommunity);
Zehn.createElement('._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '#toggleActivitySticky', addButtonActivitySticky);
Zehn.createElement('._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '#toggleActivity', addButtonActivity);

Zehn.moveAppend('._3Z3ohQ8-1NKnCZkbS6fvy ._2D64jIEK7wpUR_NlObDW76', '._39oUCO1OuizVPwcnnv88no > ._30vB9DdsPK7VrZAbb5Q1Av', [
  '._3Z3ohQ8-1NKnCZkbS6fvy ._2D64jIEK7wpUR_NlObDW76' // NAV
]);

function removeOldNav() {
  var navWrapper = document.querySelector(`._39oUCO1OuizVPwcnnv88no > ._30vB9DdsPK7VrZAbb5Q1Av`);
  if (navWrapper != null && navWrapper.hasChildNodes && navWrapper.childElementCount > 1) {
    navWrapper.lastChild.remove();
  }
}

Zehn.waitAndObserve('._39oUCO1OuizVPwcnnv88no > ._30vB9DdsPK7VrZAbb5Q1Av', removeOldNav);

function createDownloadsSpacer() {
  var wrapper = document.createElement('div');
  wrapper.classList.add('downloadsSpacer');
  if (document.querySelector(`.downloadsSpacer`) == null) {
    document.querySelector(`._3cykd-VfN_xBxf3Qxriccm`).before(wrapper || '');
  }
};
Zehn.createElement('._3cykd-VfN_xBxf3Qxriccm', '.downloadsSpacer', createDownloadsSpacer);

Zehn.moveAppend('._3cykd-VfN_xBxf3Qxriccm', '._3cykd-VfN_xBxf3Qxriccm', [
  '.downloadsSpacer', // DOWNLOADS SPACER
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3yD46y5pd3zOGR7CzKs0mC)', // ACCOUNT
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3mGEzzp18imtSzGPkduedi)', // NOTIFICATIONS
  '._1TdaAqMFadi0UTqilrkelR', // FRIENDS
  '._2EQ7ghgqIdjKv9jsQC0Zq9', // DOWNLOADS
  '._2foCkpRXhqq0UGVE50BWqj', // ADD GAME
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._5wILZhsLODVwGfcJ0hKmJ)', // ANNOUNCEMENTS
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3LKQ3S_yqrebeNLF6aeiog)' // BIG PICTURE
]);
Zehn.moveAppend('._3cykd-VfN_xBxf3Qxriccm .Focusable:has(.Utdt7JrpIm5JlpQmqyj1v)', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(.Utdt7JrpIm5JlpQmqyj1v)' // VR
]);
Zehn.moveAppend('._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3lRfTo8Wo3phXfE1DvK6QW)', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3lRfTo8Wo3phXfE1DvK6QW)' // SOUNDTRACK
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
Zehn.movePrepend('.OverlayBrowser_Browser .TitleBar.title-area', '.OverlayBrowser_Browser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);
Zehn.movePrepend('.fbu3l7kPiBeb3EKCjIb8n', '.fi6UDkxJq66MLo2z9wabQ', [
  '_3OzkVrQFFPv0aV41N4MrHV' // OVERLAY BUTTONS
]);
Zehn.moveAppend('.DKXVRVBokaW_Xxo6kyKq0', '.DKXVRVBokaW_Xxo6kyKq0', [
  '._3-jI6bR_mj4JCTwXNFFuuL' // SCREENSHOT CAPTION
]);
Zehn.movePrepend('._1fu6xumTI1nCY5wc6FG_N2', '.LCeIT0gmFTY8fdfaVgk4j', [
  '._1fu6xumTI1nCY5wc6FG_N2 .tool-tip-source' // NOTES DELETE
]);
Zehn.moveAppend('._1gvujtNl7v7FpJK6kaMeKZ', '._1gvujtNl7v7FpJK6kaMeKZ', [
  '._2yt71EY8-YdWa8dBEE1DAW' // ARTWORK DESCRIPTION
]);