import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* ENABLE CONFIG WITH MILLENNIUM ------------------------------------------------------------------------------------ */

Options.setOptions();

/* REVEAL CONTEXT --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable)' // CONTEXT ENTRY
]);

Zehn.addRevealClassOnMutation('._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable)' // CONTEXT ENTRY
]);

Zehn.revealSelf('._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');

/* REVEAL DROPDOWN -------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._30wJO3MC4x-I1OWpy1TAeE', [
  '._2oAiZidGyUxL-hfupFDQ2m:not(_2U_Y7A-0lddoJdrJBvf8JE)' // DROPDOWN ENTRY
]);

Zehn.addRevealClassOnMutation('._30wJO3MC4x-I1OWpy1TAeE', [
  '._2oAiZidGyUxL-hfupFDQ2m:not(_2U_Y7A-0lddoJdrJBvf8JE)' // DROPDOWN ENTRY
]);

Zehn.revealSelf('._2oAiZidGyUxL-hfupFDQ2m.zehnReveal');

/* REVEAL NOTIFICATION MENU ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2EstNjFIIZm_WUSKm5Wt7n', [
  '.QFW0BtI4l77AFmv1xLAkx', // ALL
  '._3B8wRA4H7e_oSksYNqpSPv', // STANDARD
  '._25gii5r23MmAqXvLZj24tK', // PINNED WEB
  '._3k90ug209sE23xAMqcM74s' // PINNED DESKTOP
]);

Zehn.addRevealClassOnMutation('._2EstNjFIIZm_WUSKm5Wt7n', [
  '.QFW0BtI4l77AFmv1xLAkx', // ALL
  '._3B8wRA4H7e_oSksYNqpSPv', // STANDARD
  '._25gii5r23MmAqXvLZj24tK', // PINNED WEB
  '._3k90ug209sE23xAMqcM74s' // PINNED DESKTOP
]);

Zehn.revealSelf('.QFW0BtI4l77AFmv1xLAkx.zehnReveal');
Zehn.revealSelf('._3B8wRA4H7e_oSksYNqpSPv.zehnReveal');
Zehn.revealSelf('._25gii5r23MmAqXvLZj24tK.zehnReveal');
Zehn.revealSelf('._3k90ug209sE23xAMqcM74s.zehnReveal');

/* ADJUST WIDTH OF GAME FILTERS BASED ON SIDEBAR WIDTH -------------------------------------------------------------- */

Zehn.observeRootForCallback('.QsvsRVwbsApgKt1MhM0fz', '.Woh0kBQCmatzC1daBX9i6', (root, target) => {
  const sidebarWidth = root.querySelector('._9sPoVBFyE_vE87mnZJ5aB').offsetWidth;
  const filterWidth = window.innerWidth - sidebarWidth;

  target.style.width = `${filterWidth}px`;
});

/* TOGGLE NAVBAR BACKGROUND CLASSES BASED ON WHAT LIBRARY PAGE IS OPEN ---------------------------------------------- */

function toggleClassWithPresence(root, target, pageSelector, toggleName) {
  const update = () => {
    const present = !!document.querySelector(pageSelector);
    target.classList.toggle(toggleName, present);
  };

  update();

  const observer = new MutationObserver(update);
  observer.observe(root, { childList: true, subtree: true });

  return observer;
};

Zehn.observeRootForCallback('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', (root, target) => {
  toggleClassWithPresence(root, target, '._1fuML-ekRbTEzgzC597yGP', 'zehnConsoleOpened');
});
Zehn.observeRootForCallback('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', (root, target) => {
  toggleClassWithPresence(root, target, '._1bq4x9pa4-9RLY-dXWUZTp', 'zehnDownloadsOpened');
});
Zehn.observeRootForCallback('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', (root, target) => {
  toggleClassWithPresence(root, target, '.MillenniumSettings', 'zehnMillenniumOpened');
});
Zehn.observeRootForCallback('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', (root, target) => {
  toggleClassWithPresence(root, target, '._39RheXihcN6H2k2muQTjkI', 'zehnStickyHeader');
});
Zehn.observeRootForCallback('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', (root, target) => {
  toggleClassWithPresence(root, target, '.RGNMWtyj73_-WdhflrmuY._3WJCt_OkjPA6npxOtguSt5', 'zehnLibraryOpened');
});

/* TOGGLE ROOT MENU ------------------------------------------------------------------------------------------------- */

Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3s0lkohH8wU2do0K1il28Y', '#zehnToggleNavigation', ['zehnButton'], false, false, (root, target, button) => {
  const btnNavigation = document.getElementById('zehnToggleNavigation');
  if (btnNavigation) {

    const root = document.querySelectorAll('._2UyOBeiSdBayaFdRa39N2O');
    const container = document.querySelector('._3mz8wQ6Q44B8P7pzPP4Iyw');

    if (btnNavigation.classList.contains('zehnToggled')) {
      container.classList.remove('zehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-menu-height', '0px');
      root.forEach((element) => {
        element.style.setProperty('height', '0px', 'important');
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('color', 'transparent', 'important');
        element.classList.add('zehnRootHidden');
        element.classList.toggle('zehnRootShown');
      });
    }
    else {
      container.classList.add('zehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-menu-height', '32px');
      root.forEach((element) => {
        element.style.setProperty('height', '32px', 'important');
        element.style.setProperty('display', 'block', 'important');
        element.style.setProperty('color', 'var(--zehn-color-text-primary)', 'important');
        element.classList.add('zehnRootShown');
        element.classList.toggle('zehnRootHidden');
      });
    }

    btnNavigation.classList.toggle('zehnToggled');
  }
});

/* TOGGLE LIBRARY SEARCH SECTION ------------------------------------------------------------------------------------ */

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleSidebarSearch', 'zehnSearchOpened');
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', '#zehnToggleSidebarSearch', ['zehnButton', 'zehnReveal'], false, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnSearchOpened');
});

/* TOGGLE LIBRARY WHAT'S NEW SECTION -------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleWhatsNew', 'zehnWhatsNewCollapsed');
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._17uEBe5Ri8TMsnfELvs8-N .SMWMsB-gz3WbYRK2HOm7i ._2o5c89vAnrXN8C60QTSMqO > div:nth-child(2)', '#zehnToggleWhatsNew', ['zehnButton'], true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnWhatsNewCollapsed');
});

/* ID GAME PAGE SECTIONS -------------------------------------------------------------------------------------------- */

Zehn.observeRootForCallback('.QsvsRVwbsApgKt1MhM0fz', '.OhSdLYuggDtBcWjYP0j_9', (root, target) => {
  const featured = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)');
  const event = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)');
  const community = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)');
  const details = target.querySelector('._2aor4XVOYzN1PBSREk0UbO');

  if (featured) {
    if (featured.id != 'zehnGameFeaturedEvent') {
      featured.id = 'zehnGameFeaturedEvent';
    }
  }

  if (event) {
    if (event.id != 'zehnGameEvent') {
      event.id = 'zehnGameEvent';
    }
  }

  if (community) {
    if (community.id != 'zehnGameCommunity') {
      community.id = 'zehnGameCommunity';
    }
  }

  if (details) {
    if (details.id != 'zehnGameDetails') {
      details.id = 'zehnGameDetails';
      details.classList.add('zehnDisplayed');
    }
  }
});

/* CHECK GAME DETAILS PANELS FOR WRAPPER ---------------------------------------------------------------------------- */

Zehn.observeRootForCallback('.QsvsRVwbsApgKt1MhM0fz', '#zehnGameDetails', (root, target) => {
  const width = target.clientWidth;
  if (target.dataset.width != width) {
    target.dataset.width = width;

    Array.from(target.children).forEach((panel) => {
      if (!panel.classList.contains('vzLedtsu3TtTlKLEKzIhH')) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('vzLedtsu3TtTlKLEKzIhH');
        target.prepend(wrapper);
        wrapper.append(panel);
      }

      if (panel.children.length == 0) {
        target.append(panel);
      }
    });
  }
});

/* TOGGLE GAME PAGE CONTENT ----------------------------------------------------------------------------------------- */

function togglePage(root, target, button) {
  const btnActivity = target.querySelector('.zehnToggleActivity');
  const btnCommunity = target.querySelector('.zehnToggleCommunity');
  const btnDetails = target.querySelector('.zehnToggleDetails');
  const buttons = [btnActivity, btnCommunity, btnDetails];

  if (btnActivity && btnCommunity && btnDetails) {
    const featured = document.getElementById('zehnGameFeaturedEvent');
    const event = document.getElementById('zehnGameEvent');
    const community = document.getElementById('zehnGameCommunity');
    const details = document.getElementById('zehnGameDetails');
    const pages = [featured, event, community, details];

    pages.forEach((page) => {
      if (button == btnActivity) {
        if (page && (page == featured || page == event)) {
          page.classList.add('zehnDisplayed');
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      } else if (button == btnCommunity) {
        if (page && (page == community)) {
          page.classList.add('zehnDisplayed');
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      } else if (button == btnDetails) {
        if (page && (page == details)) {
          page.classList.add('zehnDisplayed');
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      }
    });

    buttons.forEach((element) => {
      if (element == button) {
        element.classList.add('zehnToggled');
      } else {
        element.classList.remove('zehnToggled');
      }
    });
  }
};

Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleDetails', ['zehnButton', 'zehnReveal'], false, true, togglePage); // STICKY DETAILS
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleDetails', ['zehnButton', 'zehnReveal'], false, true, togglePage); // DETAILS
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleCommunity', ['zehnButton', 'zehnReveal'], false, false, togglePage); // STICKY COMMUNITY
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleCommunity', ['zehnButton', 'zehnReveal'], false, false, togglePage); // COMMUNITY
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleActivity', ['zehnButton', 'zehnReveal'], false, false, togglePage); // STICKY ACTIVITY
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleActivity', ['zehnButton', 'zehnReveal'], false, false, togglePage); // ACTIVITY

/* MOVE SUPERNAV INTO MAIN NAVBAR ----------------------------------------------------------------------------------- */

Zehn.moveAppendAndObserve('.QsvsRVwbsApgKt1MhM0fz', '._39oUCO1OuizVPwcnnv88no > ._30vB9DdsPK7VrZAbb5Q1Av', [
  '._3Z3ohQ8-1NKnCZkbS6fvy ._2D64jIEK7wpUR_NlObDW76' // NAV
]);
Zehn.removeDuplicatedElement('.QsvsRVwbsApgKt1MhM0fz', '._39oUCO1OuizVPwcnnv88no > ._30vB9DdsPK7VrZAbb5Q1Av', '._2D64jIEK7wpUR_NlObDW76', 0);

/* ADD SPACER FOR NAVBAR DOWNLOADS STATUS --------------------------------------------------------------------------- */

Zehn.observeForCallbackIfMissing('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', '.zehnDownloadsSpacer', (root, target, addition) => {
  const spacer = document.createElement('div');
  spacer.classList.add('zehnDownloadsSpacer');
  if (!addition) {
    document.querySelector('._3cykd-VfN_xBxf3Qxriccm').before(spacer || '');
  }
});

/* MOVE VANILLA BUTTONS INTO NAVBAR ---------------------------------------------------------------------------------- */

Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '.zehnDownloadsSpacer', // DOWNLOADS SPACER
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3yD46y5pd3zOGR7CzKs0mC)', // ACCOUNT
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3mGEzzp18imtSzGPkduedi)', // NOTIFICATIONS
  '._1TdaAqMFadi0UTqilrkelR', // FRIENDS
  '._2EQ7ghgqIdjKv9jsQC0Zq9', // DOWNLOADS
  '._2foCkpRXhqq0UGVE50BWqj', // ADD GAME
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._5wILZhsLODVwGfcJ0hKmJ)', // ANNOUNCEMENTS
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3LKQ3S_yqrebeNLF6aeiog)' // BIG PICTURE
]);
Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(.Utdt7JrpIm5JlpQmqyj1v)' // VR
]);
Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3lRfTo8Wo3phXfE1DvK6QW)' // SOUNDTRACK
]);

/* TOGGLE THEATER MODE AKA REMOVE LIBRARY SIDEBAR ------------------------------------------------------------------- */

Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u', '#zehnToggleTheaterMode', ['zehnButton'], true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnTheaterMode');
});

/* MOVE LIBRARY SIDEBAR BUTTONS ------------------------------------------------------------------------------------- */

Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._20QAC4WMXm8qFE8waUT5oo', [
  '._2PF_m-I5yte3WnQhpcz8RC' // SIDEBAR BUTTON CATEGORIES
]);
Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', [
  '._3AhYljPF4e4E8LaBt-FoY0', // SIDEBAR BUTTON LIBRARY
  '._2CEKFex6JMsAse2lqMMjUp' // SIDEBAR BUTTON COLLECTIONS
]);

/* MOVE BROWSER TABS INTO TITLEBAR ---------------------------------------------------------------------------------- */

Zehn.movePrepend('._1UJDmU3N-pkv7oTJ_Zf9nK', '.TabbedPopupBrowser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);
Zehn.movePrepend('._1UJDmU3N-pkv7oTJ_Zf9nK', '.OverlayBrowser_Browser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);

/* MOVE OVERLAY BUTTONS --------------------------------------------------------------------------------------------- */

Zehn.movePrepend('.fbu3l7kPiBeb3EKCjIb8n', '.fi6UDkxJq66MLo2z9wabQ', [
  '_3OzkVrQFFPv0aV41N4MrHV' // OVERLAY BUTTONS
]);

/* MOVE SCREENSHOT ELEMENTS ----------------------------------------------------------------------------------------- */

Zehn.moveAppend('._2p9h7sf5EGrEVlsWxtvUPH', '.DKXVRVBokaW_Xxo6kyKq0', [
  '._3-jI6bR_mj4JCTwXNFFuuL' // SCREENSHOT CAPTION
]);
Zehn.moveAppend('._2p9h7sf5EGrEVlsWxtvUPH', '._1gvujtNl7v7FpJK6kaMeKZ', [
  '._2yt71EY8-YdWa8dBEE1DAW' // ARTWORK DESCRIPTION
]);

/* MOVE NOTES DELETE BUTTON INTO PAGELIST --------------------------------------------------------------------------- */

Zehn.moveAppendAndObserve('._1AL7l2CN6z-vuLfp1iCLa', '.LCeIT0gmFTY8fdfaVgk4j', [
  '._1fu6xumTI1nCY5wc6FG_N2 .tool-tip-source' // NOTES DELETE
]);

/* MOVE SUPERNAV AND ROOT MENU LIST ITEMS INTO CONTAINERS ----------------------------------------------------------- */

Zehn.createIconTitleContainer('.Store_Supernav', '.contextMenuItem');
Zehn.createIconTitleContainer('.Library_Supernav', '.contextMenuItem');
Zehn.createIconTitleContainer('.Community_Supernav', '.contextMenuItem');
Zehn.createIconTitleContainer('.Profile_Supernav', '.contextMenuItem');

Zehn.createIconTitleContainer('.Steam_Root_Menu', '.contextMenuItem');
Zehn.createIconTitleContainer('.View_Root_Menu', '.contextMenuItem');
Zehn.createIconTitleContainer('.Friends_Root_Menu', '.contextMenuItem');
Zehn.createIconTitleContainer('.Games_Root_Menu', '.contextMenuItem');
Zehn.createIconTitleContainer('.Help_Root_Menu', '.contextMenuItem');

/* ADD PLAY ICON INTO CONTAINER -------------------------------------------------------------------------------------- */

Zehn.createIconContainer('.jjN9CtYfeIJoHpKOCmKOx', 'zehnIconContainer'); // COMMUNITY ICON

/* ADD ICON ELEMENTS TO CLOCK BUTTONS-------------------------------------------------------------------------------- */

Zehn.createIconTitleContainer('.jSQQl34mj8a4NOKubD6AT', '.HijmccPB1BKyhOwhX1EVl');

/* ADD SEPARATOR ELEMENT IN DROPDOWN -------------------------------------------------------------------------------- */

Zehn.createBeforeTarget('._30wJO3MC4x-I1OWpy1TAeE', '._2oAiZidGyUxL-hfupFDQ2m._2U_Y7A-0lddoJdrJBvf8JE', 'zehnSeparator');

/* REVEAL SIDEBAR --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._1ZS_xta5HMXzR8JgxDH6n7', [
  '.uE7Pj4tb2n3_Bx4vjEX0a', // SCROLL UP
  '._3AhYljPF4e4E8LaBt-FoY0', // LIBRARY
  '._2CEKFex6JMsAse2lqMMjUp', // COLLECTIONS
  '._3mzKdQXht__YHo6PX1LmB6' // FILTERS (LINUX, SORT BY, READY TO PLAY)
]);

Zehn.addRevealClassOnMutation('._1ZS_xta5HMXzR8JgxDH6n7', [
  '.uE7Pj4tb2n3_Bx4vjEX0a', // SCROLL UP
  '._3mzKdQXht__YHo6PX1LmB6', // FILTERS (LINUX, SORT BY, READY TO PLAY)
]);

Zehn.revealInner('._1ZS_xta5HMXzR8JgxDH6n7');

/* REVEAL PLAYBAR --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._9EHg918wH6CQCQlD5PWOO', [
  '._3ydigb6zZAjJ0JCDgHwSYA._2AzIX5kl9k6JnxLfR5H4kX', // PLAY
  '._2q-gZ3XJzlvSGHSF-GvSmi._2AzIX5kl9k6JnxLfR5H4kX', // MENU
  '.zehnButton#zehnToggleActivity', // ACTIVITY
  '.zehnButton#zehnToggleCommunity', // COMMUNITY
  '.zehnButton#zehnToggleDetails', // DETAILS
  '._3oddBTkj_FjknCgBnPqcmQ ._3qDWQGB0rtwM3qpXTb11Q-', // SETTINGS
  '._3qDWQGB0rtwM3qpXTb11Q-._1oYt_BfxCHnA-_6sfUHiNn', // CONTROLLER
  '._3qDWQGB0rtwM3qpXTb11Q- .zvLq1GUCH3yLuqv_TXBJ1', // INFO / SCROLL UP
  '._21hXW2oDD7zvNsoOaW7Yob' // FAVORITE
]);

Zehn.addRevealClassOnMutation('._9EHg918wH6CQCQlD5PWOO', [
  '._21hXW2oDD7zvNsoOaW7Yob' // FAVORITE
]);

Zehn.revealInner('._3fLo166MlaNqP8r8tTyRz');

/* REVEAL MEDIA LIBRARY --------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.YzIcpcz4oFx-nndxro5jE', [
  '._28eIRmQ229ntDIyQXTn3Ub._32Lfwcdolc3ByZWItfR3ni', // BUTTONS
  '._36KTbApKz0VLY9Q6lGt4aH' // SEARCH
]);

Zehn.revealInner('.YzIcpcz4oFx-nndxro5jE');

/* REVEAL SCREENSHOT ------------------------------------------------------------------------------------------------ */

// Zehn.addRevealClass('.DKXVRVBokaW_Xxo6kyKq0', [
//   '.mZYRu1dN5Q9aQ1r3Cq_NE', // REACTIONS
//   '._28eIRmQ229ntDIyQXTn3Ub._32Lfwcdolc3ByZWItfR3ni.QE3sHW9puNTAjiRDY71Xy' // BUTTONS
// ]);

// Zehn.revealChildren('.DKXVRVBokaW_Xxo6kyKq0');

/* REVEAL SERVERS --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2X_ZpO2X_CIOIEfml3ZTcX', [
  '.DialogButton', // BUTTONS
  '.DialogDropDown' // DROPDOWN
]);

Zehn.revealInner('._2X_ZpO2X_CIOIEfml3ZTcX');

/* REVEAL SETTINGS + NOTES ------------------------------------------------------------------------------------------ */

Zehn.addRevealClass('.PageListColumn', [
  '._1-vlriAtKYDViAEunue4VO', // LIST ENTRY
  '._2mL2HfT5AkDXRi1YBnRWKa', // CONTROLLER SETTINGS LIST ENTRY
  '._3Sjbkvk647UKKVLX6J7gsW' // NEW NOTE
], true)

Zehn.addRevealClassOnMutation('.PageListColumn', [
  '._1-vlriAtKYDViAEunue4VO', // LIST ENTRY
  '._2mL2HfT5AkDXRi1YBnRWKa' // CONTROLLER SETTINGS LIST ENTRY
], true)

Zehn.revealInner('.PageListColumn');

/* REVEAL GROUP CHAT SETTINGS --------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.xSTLmzylFJdIfak7ZdhuA', [
  '._2YV0m3IRCNOoUV9YhJNFnV', // LIST ENTRY
  '._1NqKTWvxtFgflRlqLTtv7e' // LEAVE
], true)

Zehn.addRevealClassOnMutation('.xSTLmzylFJdIfak7ZdhuA', [
  '._2YV0m3IRCNOoUV9YhJNFnV' // LIST ENTRY
], true)

Zehn.revealInner('.xSTLmzylFJdIfak7ZdhuA');

/* REVEAL CONTROLLER SETTINGS --------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2oua5ZJCOVQf0Vwgk7teo', [
  '._3glxw5rYlV6DTRgH3dHWPD' // LIST ENTRY
], true);

Zehn.addRevealClassOnMutation('._2oua5ZJCOVQf0Vwgk7teo', [
  '._3glxw5rYlV6DTRgH3dHWPD' // LIST ENTRY
], true);

Zehn.revealInner('._2oua5ZJCOVQf0Vwgk7teo');

/* REVEAL OVERLAY EXIT ---------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.fi6UDkxJq66MLo2z9wabQ', [
  '.BoygotvcKo4DC4dSix8G3', // CLOSE
  '.mh8m9p4PBg_Qrev1bfTzc' // BACK TO GAME
]);

Zehn.revealInner('.fi6UDkxJq66MLo2z9wabQ');

/* REVEAL OVERLAY WINDOWS ------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._1EI98QaSW75zbVd3gxgBfS', [
  '._3ZLaTxSHxeGcoKlIy_-Z0L' // WINDOW BUTTONS
]);

Zehn.addRevealClassOnMutation('._1EI98QaSW75zbVd3gxgBfS', [
  '._3ZLaTxSHxeGcoKlIy_-Z0L' // WINDOW BUTTONS
]);

Zehn.revealInner('._1EI98QaSW75zbVd3gxgBfS');

/* REVEAL CLOCK/TIMER ----------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._1JTFbdOLNdh4RmamEfRS39', [
  '.HijmccPB1BKyhOwhX1EVl' // BUTTONS
]);

Zehn.addRevealClassOnMutation('._1JTFbdOLNdh4RmamEfRS39', [
  '.HijmccPB1BKyhOwhX1EVl' // BUTTONS
]);

Zehn.revealInner('._1JTFbdOLNdh4RmamEfRS39');