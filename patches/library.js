import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

Zehn.addUserAgent();

Options.setOptions();

function setFilterWidth() {
  var sidebar = document.querySelector(`._9sPoVBFyE_vE87mnZJ5aB`);
  var filter = document.querySelector(`.Woh0kBQCmatzC1daBX9i6`);

  if (filter != null) {
    var sidebarWidth = sidebar.offsetWidth;
    var filterWidth = window.innerWidth - sidebarWidth;

    filter.style.width = `${filterWidth}px`;
  }
}

Zehn.waitAndObserve('.Woh0kBQCmatzC1daBX9i6', setFilterWidth);

function toggleNavbarClass(page, toggle) {
  var navbar = document.querySelector(`._3Z7VQ1IMk4E3HsHvrkLNgo`);
  var page = document.querySelector(`${page}`);

  if (navbar != null) {
    if (page != null) {
      if (!navbar.classList.contains(`${toggle}`)) {
        navbar.classList.add(`${toggle}`);
      }
    } else if (page == null) {
      if (navbar.classList.contains(`${toggle}`)) {
        navbar.classList.remove(`${toggle}`);
      }
    }
  }
}

function toggleConsole() {
  toggleNavbarClass('._1fuML-ekRbTEzgzC597yGP', 'ZehnConsoleOpened');
}

function toggleDownloads() {
  toggleNavbarClass('._1bq4x9pa4-9RLY-dXWUZTp', 'ZehnDownloadsOpened');
}

function toggleMillennium() {
  toggleNavbarClass('.MillenniumSettings', 'ZehnMillenniumOpened');
}

function toggleSticky() {
  toggleNavbarClass('._39RheXihcN6H2k2muQTjkI', 'ZehnStickyHeader');
}

function toggleLibrary() {
  toggleNavbarClass('.RGNMWtyj73_-WdhflrmuY._3WJCt_OkjPA6npxOtguSt5', 'ZehnLibraryOpened');
}

Zehn.waitAndObserve('._3Z7VQ1IMk4E3HsHvrkLNgo', toggleConsole);
Zehn.waitAndObserve('._3Z7VQ1IMk4E3HsHvrkLNgo', toggleDownloads);
Zehn.waitAndObserve('._3Z7VQ1IMk4E3HsHvrkLNgo', toggleMillennium);
Zehn.waitAndObserve('._3Z7VQ1IMk4E3HsHvrkLNgo', toggleSticky);
Zehn.waitAndObserve('._3Z7VQ1IMk4E3HsHvrkLNgo', toggleLibrary);

function toggleNavigation() {
  var btnNavigation = document.getElementById('toggleNavigation');

  if (btnNavigation != null) {

    var root = document.querySelectorAll(`._2UyOBeiSdBayaFdRa39N2O`);
    var nav = document.querySelector(`._2D64jIEK7wpUR_NlObDW76`);
    var navbar = document.querySelector(`._3Z7VQ1IMk4E3HsHvrkLNgo`);

    if (btnNavigation.classList.contains(`ZehnToggled`)) {
      navbar.classList.remove('ZehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-menu-height', '0px');
      document.documentElement.style.setProperty('--zehn-menu-margin', '0px');
      root.forEach((element) => {
        element.style.setProperty('height', '0px', 'important');
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('color', 'transparent', 'important');
        element.classList.add('rootHidden');
        element.classList.toggle('rootShown');
      });
    }
    else {
      navbar.classList.add('ZehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-menu-height', '32px');
      document.documentElement.style.setProperty('--zehn-menu-margin', 'var(--zehn-menu-margin-scroll)');
      root.forEach((element) => {
        element.style.setProperty('height', '32px', 'important');
        element.style.setProperty('display', 'block', 'important');
        element.style.setProperty('color', 'var(--zehn-color-text-primary)', 'important');
        element.classList.add('rootShown');
        element.classList.toggle('rootHidden');
      });
    }

    btnNavigation.classList.toggle('ZehnToggled');
  }
};

function checkButtonToggle(targetClass, buttonId, classToAdd) {
  var target = document.querySelector(`${targetClass}`);
  var btn = document.getElementById(`${buttonId}`);

  if (target != null) {
    if (target.classList.contains(`${classToAdd}`)) {
      if (btn != null) {
        if (!btn.classList.contains('ZehnToggled')) {
          btn.classList.add('ZehnToggled');
        }
      }
    }
  }
}

function checkSearchState() {
  checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', 'toggleSidebarSearch', 'ZehnSearchOpened');
}

Zehn.waitAndObserve('.QsvsRVwbsApgKt1MhM0fz', checkSearchState);

function checkWhatsNewState() {
  checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', 'toggleWhatsNew', 'ZehnWhatsNewCollapsed');
}

Zehn.waitAndObserve('.QsvsRVwbsApgKt1MhM0fz', checkWhatsNewState);

function addClassOnToggle(targetClass, buttonId, classToAdd) {
  var target = document.querySelector(`${targetClass}`);
  var btn = document.getElementById(`${buttonId}`);

  if (btn != null) {
    btn.classList.toggle('ZehnToggled');
    if (target != null) {
      if (btn.classList.contains('ZehnToggled')) {
        if (!target.classList.contains(`${classToAdd}`)) {
          target.classList.add(`${classToAdd}`);
        }
      } else {
        if (target.classList.contains(`${classToAdd}`)) {
          target.classList.remove(`${classToAdd}`);
        }
      }
    }
  }
}

function toggleSidebarSearch() {
  addClassOnToggle('.QsvsRVwbsApgKt1MhM0fz', 'toggleSidebarSearch', 'ZehnSearchOpened');
}

function toggleTheaterMode() {
  addClassOnToggle('.QsvsRVwbsApgKt1MhM0fz', 'toggleTheaterMode', 'ZehnTheaterMode');
};

function toggleWhatsNew() {
  addClassOnToggle('.QsvsRVwbsApgKt1MhM0fz', 'toggleWhatsNew', 'ZehnWhatsNewCollapsed');
};

function nameGameSections() {
    var featured = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)`);
    var event = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)`);
    var community = document.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)`);
    var details = document.querySelector(`._2aor4XVOYzN1PBSREk0UbO`);

    if (featured != null) {
      if (featured.id != 'ZehnGameFeaturedEvent') {
        featured.id = 'ZehnGameFeaturedEvent';
      }
    }

    if (event != null) {
      if (event.id != 'ZehnGameEvent') {
        event.id = 'ZehnGameEvent';
      }
    }

    if (community != null) {
      if (community.id != 'ZehnGameCommunity') {
        community.id = 'ZehnGameCommunity';
      }
    }

    if (details != null) {
      if (details.id != 'ZehnGameDetails') {
        details.id = 'ZehnGameDetails';
      }
    }
}

Zehn.waitAndObserve('.OhSdLYuggDtBcWjYP0j_9', nameGameSections);

function toggleActivity() {
  var btnActivitySticky = document.getElementById('toggleActivitySticky');
  var btnActivity = document.getElementById('toggleActivity');
  var btnCommunitySticky = document.getElementById('toggleCommunitySticky');
  var btnCommunity = document.getElementById('toggleCommunity');
  var btnDetailsSticky = document.getElementById('toggleDetailsSticky');
  var btnDetails = document.getElementById('toggleDetails');

  if (btnActivity != null && btnCommunity != null && btnDetails != null) {

    var featured = document.getElementById('ZehnGameFeaturedEvent');
    var event = document.getElementById('ZehnGameEvent');
    var community = document.getElementById('ZehnGameCommunity');
    var details = document.getElementById('ZehnGameDetails');

    if (featured != null) {
      if (featured.hasChildNodes()) {
        featured.style.setProperty('display', 'block', 'important');
      }
    }

    if (event != null) {
      event.style.setProperty('display', 'block', 'important');
    }

    if (community != null) {
      community.style.setProperty('display', 'none', 'important');
    }

    if (details != null) {
      details.style.setProperty('display', 'none', 'important');
    }

    btnActivitySticky.classList.add('ZehnToggled');
    btnActivity.classList.add('ZehnToggled');
    btnCommunitySticky.classList.remove('ZehnToggled');
    btnCommunity.classList.remove('ZehnToggled');
    btnDetailsSticky.classList.remove('ZehnToggled');
    btnDetails.classList.remove('ZehnToggled');
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

    var featured = document.getElementById('ZehnGameFeaturedEvent');
    var event = document.getElementById('ZehnGameEvent');
    var community = document.getElementById('ZehnGameCommunity');
    var details = document.getElementById('ZehnGameDetails');

    if (featured != null) {
      featured.style.setProperty('display', 'none', 'important');
    }

    if (event != null) {
      event.style.setProperty('display', 'none', 'important');
    }

    if (community != null) {
      community.style.setProperty('display', 'block', 'important');
    }

    if (details != null) {
      details.style.setProperty('display', 'none', 'important');
    }

    btnActivitySticky.classList.remove('ZehnToggled');
    btnActivity.classList.remove('ZehnToggled');
    btnCommunitySticky.classList.add('ZehnToggled');
    btnCommunity.classList.add('ZehnToggled');
    btnDetailsSticky.classList.remove('ZehnToggled');
    btnDetails.classList.remove('ZehnToggled');
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

    var featured = document.getElementById('ZehnGameFeaturedEvent');
    var event = document.getElementById('ZehnGameEvent');
    var community = document.getElementById('ZehnGameCommunity');
    var details = document.getElementById('ZehnGameDetails');

    if (featured != null) {
      featured.style.setProperty('display', 'none', 'important');
    }

    if (event != null) {
      event.style.setProperty('display', 'none', 'important');
    }

    if (community != null) {
      community.style.setProperty('display', 'none', 'important');
    }

    if (details != null) {
      details.style.setProperty('display', 'flex', 'important');
    }

    btnActivitySticky.classList.remove('ZehnToggled');
    btnActivity.classList.remove('ZehnToggled');
    btnCommunitySticky.classList.remove('ZehnToggled');
    btnCommunity.classList.remove('ZehnToggled');
    btnDetailsSticky.classList.add('ZehnToggled');
    btnDetails.classList.add('ZehnToggled');
  }
};

function addButtonNavigationToggle(target) {
  Zehn.addButton(target, 'toggleNavigation', 'toggleNavigationIcon', false, toggleNavigation);
};

function addButtonActivitySelectSticky(target) {
  Zehn.addButton(target, 'toggleActivitySticky', 'toggleActivityIconSticky', false, toggleActivity);
};

function addButtonActivitySelect(target) {
  Zehn.addButton(target, 'toggleActivity', 'toggleActivityIcon', false, toggleActivity);
};

function addButtonCommunitySelectSticky(target) {
  Zehn.addButton(target, 'toggleCommunitySticky', 'toggleCommunityIconSticky', false, toggleCommunity);
};

function addButtonCommunitySelect(target) {
  Zehn.addButton(target, 'toggleCommunity', 'toggleCommunityIcon', false, toggleCommunity);
};

function addButtonDetailsSelectSticky(target) {
  Zehn.addButton(target, 'toggleDetailsSticky', 'toggleDetailsIconSticky', false, toggleDetails);
  document.getElementById('toggleDetailsSticky').classList.add('ZehnToggled');
};

function addButtonDetailsSelect(target) {
  Zehn.addButton(target, 'toggleDetails', 'toggleDetailsIcon', false, toggleDetails);
    document.getElementById('toggleDetails').classList.add('ZehnToggled');
};

function addButtonWhatsNewToggle(target) {
  Zehn.addButton(target, 'toggleWhatsNew', 'toggleWhatsNewIcon', true, toggleWhatsNew);
};

function addButtonSidebarSearchToggle(target) {
  Zehn.addButton(target, 'toggleSidebarSearch', 'toggleSidebarSearchIcon', false, toggleSidebarSearch);
};

function addButtonTheaterModeToggle(target) {
  Zehn.addButton(target, 'toggleTheaterMode', 'toggleTheaterModeIcon', true, toggleTheaterMode);
};

Zehn.createElement('._3s0lkohH8wU2do0K1il28Y', '#toggleNavigation', addButtonNavigationToggle);

Zehn.createElement('.QsvsRVwbsApgKt1MhM0fz ._2WgQEFvIzJw_SHNGbjtRFU', '#toggleSidebarSearch', addButtonSidebarSearchToggle);

Zehn.createElement('._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u', '#toggleTheaterMode', addButtonTheaterModeToggle);

Zehn.createElement('._17uEBe5Ri8TMsnfELvs8-N .SMWMsB-gz3WbYRK2HOm7i ._2o5c89vAnrXN8C60QTSMqO > div:nth-child(2)', '#toggleWhatsNew', addButtonWhatsNewToggle);

Zehn.createElement('._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '#toggleDetailsSticky', addButtonDetailsSelectSticky);
Zehn.createElement('._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '#toggleDetails', addButtonDetailsSelect);
Zehn.createElement('._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '#toggleCommunitySticky', addButtonCommunitySelectSticky);
Zehn.createElement('._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '#toggleCommunity', addButtonCommunitySelect);
Zehn.createElement('._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '#toggleActivitySticky', addButtonActivitySelectSticky);
Zehn.createElement('._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '#toggleActivity', addButtonActivitySelect);

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
Zehn.moveAppend('._20QAC4WMXm8qFE8waUT5oo', '._20QAC4WMXm8qFE8waUT5oo', [
  '._2PF_m-I5yte3WnQhpcz8RC' // SIDEBAR BUTTON CATEGORIES
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
Zehn.moveAppend('._1gvujtNl7v7FpJK6kaMeKZ', '._1gvujtNl7v7FpJK6kaMeKZ', [
  '._2yt71EY8-YdWa8dBEE1DAW' // ARTWORK DESCRIPTION
]);
Zehn.moveAppend('._1fu6xumTI1nCY5wc6FG_N2', '._3Sf_ShCtdfWp5P04k2cIgp .PageListColumn', [
  '._1fu6xumTI1nCY5wc6FG_N2 .tool-tip-source' // NOTES DELETE
]);

function removeOldNotesDelete() {
  var column = document.querySelector(`._3Sf_ShCtdfWp5P04k2cIgp .PageListColumn`);
  if (column != null && column.hasChildNodes && column.childElementCount > 4) {
    column.lastChild.previousElementSibling.remove();
  }
}

Zehn.waitAndObserve('._3Sf_ShCtdfWp5P04k2cIgp .PageListColumn', removeOldNotesDelete);