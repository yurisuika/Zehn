import './shared/base.js';
import './shared/slider.js';
import './shared/soundtrack.js';
import './shared/spinner.js';
import './shared/switch.js';
import './shared/context.js';
import './shared/pagelist.js';
import { FIND, STORE, TOGGLE, CREATE, MOVE } from './lib/util.js';
import REVEAL from './lib/reveal.js';
import WAIFU from './lib/waifu.js';
import SECRET from './lib/secret.js';

/* ADJUST WIDTH OF GAME FILTERS BASED ON SIDEBAR WIDTH -------------------------------------------------------------- */

FIND.handleOnMutation('.QsvsRVwbsApgKt1MhM0fz', '.Woh0kBQCmatzC1daBX9i6', (root, target) => {
  const SIDEBAR = root.querySelector('._9sPoVBFyE_vE87mnZJ5aB');

  if (SIDEBAR) {
    var filterWidth = window.innerWidth - SIDEBAR.offsetWidth;
    target.style.width = `${filterWidth}px`;
  }
}, { shouldObserveTarget: false, shouldDisconnect: false, shouldAddAttributeFilter: false });

/* TOGGLE NAVBAR BACKGROUND CLASSES BASED ON WHAT LIBRARY PAGE IS OPEN ---------------------------------------------- */

TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._1fuML-ekRbTEzgzC597yGP', 'zehnConsoleOpened');
TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._1bq4x9pa4-9RLY-dXWUZTp', 'zehnDownloadsOpened');
TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '.MillenniumSettings', 'zehnMillenniumOpened');
TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._39RheXihcN6H2k2muQTjkI', 'zehnStickyHeader');
TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._3WJCt_OkjPA6npxOtguSt5', 'zehnLibraryOpened');

/* TOGGLE GAME PAGE CLASSES BASED ON WHAT SECTIONS ARE AVAILABLE ---------------------------------------------------- */

TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._2Dd4T78PcCTUVgOtDGFY5j', '#zehnGameActivity' , 'zehnWithActivity');
TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._2Dd4T78PcCTUVgOtDGFY5j', '#zehnGameCommunity' , 'zehnWithCommunity');
TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._2Dd4T78PcCTUVgOtDGFY5j', '#zehnGameDetails' , 'zehnWithDetails');

/* TOGGLE ROOT MENU ------------------------------------------------------------------------------------------------- */

CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3Z7VQ1IMk4E3HsHvrkLNgo', ['#zehnToggleNavigation', '.zehnButton'], (root, target, button) => {
  const ROOT_MENUS = document.querySelector('._3mz8wQ6Q44B8P7pzPP4Iyw');
  ROOT_MENUS.classList.toggle('zehnMenuOpened', !button.classList.contains('zehnToggled'));
  button.classList.toggle('zehnToggled');
}, { shouldAppend: false });

FIND.findRootsAndTargets('.QsvsRVwbsApgKt1MhM0fz', '._1rDh5rXSFZJOqCa4UpnI4z', (root, target) => {
  const ROOT_MENUS = document.querySelector('._3mz8wQ6Q44B8P7pzPP4Iyw');
  const BTN_NAV = document.getElementById('zehnToggleNavigation');

  target.addEventListener('click', (e) => {
    ROOT_MENUS.classList.contains('zehnMenuOpened') && ROOT_MENUS.classList.remove('zehnMenuOpened');
    BTN_NAV.classList.contains('zehnToggled') && BTN_NAV.classList.remove('zehnToggled');
  });
});

/* TOGGLE LIBRARY SEARCH SECTION ------------------------------------------------------------------------------------ */

TOGGLE.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleSidebarSearch', 'zehnSearchOpened');
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', ['#zehnToggleSidebarSearch', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnSearchOpened');
}, { shouldAppend: false });

/* TOGGLE LIBRARY WHAT'S NEW SECTION -------------------------------------------------------------------------------- */

TOGGLE.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleWhatsNew', 'zehnWhatsNewCollapsed');
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._17uEBe5Ri8TMsnfELvs8-N .SMWMsB-gz3WbYRK2HOm7i ._2o5c89vAnrXN8C60QTSMqO .bsNegRKT1Hbv4tqHrOk9-', ['#zehnToggleWhatsNew', '.zehnButton'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnWhatsNewCollapsed');
}, { shouldAppend: false });

/* ID GAME PAGE SECTIONS -------------------------------------------------------------------------------------------- */

FIND.findRootsAndTargets('.QsvsRVwbsApgKt1MhM0fz', '.OhSdLYuggDtBcWjYP0j_9', (root, target) => {
  const FEATURED = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)');
  const ACTIVITY = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)');
  const COMMUNITY = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)');
  const DETAILS = target.querySelector('._2aor4XVOYzN1PBSREk0UbO');

  if (FEATURED) {
    if (FEATURED.id != 'zehnGameFeatured') {
      FEATURED.id = 'zehnGameFeatured';
    }
  }

  if (ACTIVITY) {
    if (ACTIVITY.id != 'zehnGameActivity') {
      ACTIVITY.id = 'zehnGameActivity';
    }
  }

  if (COMMUNITY) {
    if (COMMUNITY.id != 'zehnGameCommunity') {
      COMMUNITY.id = 'zehnGameCommunity';
    }
  }

  if (DETAILS) {
    if (DETAILS.id != 'zehnGameDetails') {
      DETAILS.id = 'zehnGameDetails';
      DETAILS.classList.add('zehnDisplayed');
      target.id = 'zehnDetailsDisplayed';
    }
  }
});

/* CHECK GAME DETAILS PANELS FOR WRAPPER ---------------------------------------------------------------------------- */

FIND.findRootsAndTargets('.QsvsRVwbsApgKt1MhM0fz', '#zehnGameDetails', (root, target) => {
  const WIDTH = target.clientWidth;
  if (target.dataset.width != WIDTH) {
    target.dataset.width = WIDTH;

    Array.from(target.children).forEach((panel) => {
      if (!panel.classList.contains('vzLedtsu3TtTlKLEKzIhH')) {
        const WRAPPER = document.createElement('div');
        WRAPPER.classList.add('vzLedtsu3TtTlKLEKzIhH');
        target.prepend(WRAPPER);
        WRAPPER.append(panel);
      }

      if (panel.children.length == 0) {
        target.append(panel);
      }
    });
  }
});

/* TOGGLE GAME PAGE CONTENT ----------------------------------------------------------------------------------------- */

function togglePage(root, target, button) {
  const BTN_ACTIVITY = target.querySelector('.zehnToggleActivity');
  const BTN_COMMUNITY = target.querySelector('.zehnToggleCommunity');
  const BTN_DETAILS = target.querySelector('.zehnToggleDetails');
  const BUTTONS = [BTN_ACTIVITY, BTN_COMMUNITY, BTN_DETAILS];

  if (BTN_ACTIVITY && BTN_COMMUNITY && BTN_DETAILS) {
    const CONTAINER = root.querySelector('.OhSdLYuggDtBcWjYP0j_9');
    const FEATURED = document.getElementById('zehnGameFeatured');
    const ACTIVITY = document.getElementById('zehnGameActivity');
    const COMMUNITY = document.getElementById('zehnGameCommunity');
    const DETAILS = document.getElementById('zehnGameDetails');
    const PAGES = [FEATURED, ACTIVITY, COMMUNITY, DETAILS];

    PAGES.forEach((page) => {
      if (button == BTN_ACTIVITY) {
        if (page && (page == FEATURED || page == ACTIVITY)) {
          page.classList.add('zehnDisplayed');
          CONTAINER.id = 'zehnActivityDisplayed';
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      } else if (button == BTN_COMMUNITY) {
        if (page && (page == COMMUNITY)) {
          page.classList.add('zehnDisplayed');
          CONTAINER.id = 'zehnCommunityDisplayed';
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      } else if (button == BTN_DETAILS) {
        if (page && (page == DETAILS)) {
          page.classList.add('zehnDisplayed');
          CONTAINER.id = 'zehnDetailsDisplayed';
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      }
    });

    BUTTONS.forEach((element) => {
      if (element == button) {
        element.classList.add('zehnToggled');
      } else {
        element.classList.remove('zehnToggled');
      }
    });
  }
};

CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleDetails', '.zehnButton', '.zehnReveal', '.zehnToggled'], togglePage, { shouldAppend: false }); // STICKY DETAILS
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleDetails', '.zehnButton', '.zehnReveal', '.zehnToggled'], togglePage, { shouldAppend: false }); // DETAILS
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleCommunity', '.zehnButton', '.zehnReveal'], togglePage, { shouldAppend: false }); // STICKY COMMUNITY
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleCommunity', '.zehnButton', '.zehnReveal'], togglePage, { shouldAppend: false }); // COMMUNITY
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleActivity', '.zehnButton', '.zehnReveal'], togglePage, { shouldAppend: false }); // STICKY ACTIVITY
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleActivity', '.zehnButton', '.zehnReveal'], togglePage, { shouldAppend: false }); // ACTIVITY

/* WRAP NAVIGATION CONTROLS FOR BACKGROUND -------------------------------------------------------------------------- */

CREATE.createContainer('._2D64jIEK7wpUR_NlObDW76', '._2D64jIEK7wpUR_NlObDW76>._25lBLzuVeYAUG279up4xP8:nth-child(2)', ['#zehnForwardsWrapper']);
CREATE.createContainer('._2D64jIEK7wpUR_NlObDW76', '._2D64jIEK7wpUR_NlObDW76>._25lBLzuVeYAUG279up4xP8', ['#zehnBackwardsWrapper']);

/* MOVE VANILLA BUTTONS INTO NAVBAR ---------------------------------------------------------------------------------- */

MOVE.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '._2EQ7ghgqIdjKv9jsQC0Zq9', // DOWNLOADS
  '._2foCkpRXhqq0UGVE50BWqj', // ADD GAME
  '._1TdaAqMFadi0UTqilrkelR' // FRIENDS
]);

/* TOGGLE THEATER MODE AKA REMOVE LIBRARY SIDEBAR ------------------------------------------------------------------- */

TOGGLE.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleTheaterMode', 'zehnTheaterMode');
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u', ['#zehnToggleTheaterMode', '.zehnButton'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnTheaterMode');
});

/* TOGGLE NAVBAR EXPANSION ------------------------------------------------------------------------------------------ */

TOGGLE.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleExpandedNavbar', 'zehnExpandedNavbar');
CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u', ['#zehnToggleExpandedNavbar', '.zehnButton'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnExpandedNavbar');
});

/* MOVE LIBRARY SIDEBAR BUTTONS ------------------------------------------------------------------------------------- */

MOVE.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._20QAC4WMXm8qFE8waUT5oo', [
  '._2PF_m-I5yte3WnQhpcz8RC' // SIDEBAR BUTTON CATEGORIES
]);
MOVE.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', [
  '._3AhYljPF4e4E8LaBt-FoY0', // SIDEBAR BUTTON LIBRARY
  '._2CEKFex6JMsAse2lqMMjUp', // SIDEBAR BUTTON COLLECTIONS
  '._1PgAonvorr0o_NMxNKiDFU ._3mzKdQXht__YHo6PX1LmB6' // FILTER CONTROLS
]);

/* CLOSE MILLENNIUM SETTINGS ---------------------------------------------------------------------------------------- */

CREATE.createButton('.QsvsRVwbsApgKt1MhM0fz', '.MillenniumSettings', ['.title-area-icon', '.closeButton', '.windowControlButton'], (root, target, button) => {
  target.style.display = `none`;
});

const CH = new BroadcastChannel('millennium-settings-sync');

FIND.findRootsAndTargets('.QsvsRVwbsApgKt1MhM0fz', '.MillenniumSettings', (root, millenniumSettings) => {
  const CH = new BroadcastChannel('millennium-settings-sync');

  CH.onmessage = (event) => {
    const { type: TYPE, style: STYLE } = event.data || {};
    if (TYPE !== 'APPLY_STYLE') return;

    Object.assign(millenniumSettings.style, STYLE);
  };
});

/* DISABLE BUTTON IF THERE IS NO LINKS PANEL ------------------------------------------------------------------------ */

TOGGLE.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._2Dd4T78PcCTUVgOtDGFY5j', '._2r4TK4BAuU-J4FuF_O7v_5._3-V8vjmrwuJM6Ws3tsjFJj' , 'zehnWithGameLinks');

/* TOGGLE GAME LINKS ------------------------------------------------------------------------------------------------ */

TOGGLE.checkButtonToggle('._2Dd4T78PcCTUVgOtDGFY5j', '.zehnToggleGameLinks', 'zehnGameLinksExpanded');

function toggleLinks(root, target, button) {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnGameLinksExpanded');
  root.querySelectorAll('.zehnToggleGameLinks').forEach(linkButton => {
    linkButton.classList.toggle('zehnToggled', root.classList.contains('zehnGameLinksExpanded'));
  });
};

CREATE.createButton('._2Dd4T78PcCTUVgOtDGFY5j', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleGameLinks', '.zehnButton', '.zehnReveal'], toggleLinks); // STICKY PLAYBAR
CREATE.createButton('._2Dd4T78PcCTUVgOtDGFY5j', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleGameLinks', '.zehnButton', '.zehnReveal'], toggleLinks); // PLAYBAR

/* WRAP LOAD MORE --------------------------------------------------------------------------------------------------- */

CREATE.createTextContainer('._5uvIN6jXDXzzck59F-nhv', '._1EC1xjjUGqI7fqX6PVzJA3', ['.zehnNews']);
CREATE.createTextContainer('._5uvIN6jXDXzzck59F-nhv', '._39ZurKJQex6v69aXzvc_nj', ['.zehnLoad']);

/* ADD PLAY ICON INTO CONTAINER ------------------------------------------------------------------------------------- */

CREATE.createIconContainer('.QsvsRVwbsApgKt1MhM0fz', '.jjN9CtYfeIJoHpKOCmKOx', ['.zehnPlayWrapper']);

/* WRAP ALL COLLECTIONS HEADER AND LIST ----------------------------------------------------------------------------- */

CREATE.createWrapper('._1TBJ1lK-VmJ2h1lXzBtGxA', '.u1xD3KJEgksF_J_5TLZzO', ['#zehnCollectionsWrapper']);










/* REVEAL SIDEBAR --------------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._1ZS_xta5HMXzR8JgxDH6n7', [
  '.uE7Pj4tb2n3_Bx4vjEX0a', // SCROLL UP
  '._3AhYljPF4e4E8LaBt-FoY0 ._3pSPluBgf0NeR1kkCLWMhR', // LIBRARY
  '._2CEKFex6JMsAse2lqMMjUp ._3pSPluBgf0NeR1kkCLWMhR', // COLLECTIONS
  '._3mzKdQXht__YHo6PX1LmB6' // FILTERS (LINUX, SORT BY, READY TO PLAY)
]);

REVEAL.revealInner('._1ZS_xta5HMXzR8JgxDH6n7');

/* REVEAL SIDEBAR SHOW ALL ------------------------------------------------------------------------------------------ */

REVEAL.addRevealClass('._3x1HklzyDs4TEjACrRO2tB', [
  '._2Q95p8Q2cZFieeOi06-FS9' // BUTTON
]);

REVEAL.revealSelf('._2Q95p8Q2cZFieeOi06-FS9');

/* REVEAL SIDEBAR GAME LIST ----------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.ReactVirtualized__Grid__innerScrollContainer', [
  'div[role="gridcell"]' // LIST ENTRY
], [
  'zehnRevealBackgroundOnly',
  'zehnRevealRipple'
]);

REVEAL.revealSelf('.ReactVirtualized__Grid__innerScrollContainer>div[role="gridcell"]');

/* REVEAL PLAYBAR --------------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._9EHg918wH6CQCQlD5PWOO', [
  '._3ydigb6zZAjJ0JCDgHwSYA._2AzIX5kl9k6JnxLfR5H4kX', // PLAY
  '._2q-gZ3XJzlvSGHSF-GvSmi._2AzIX5kl9k6JnxLfR5H4kX', // MENU
  '.zehnButton#zehnToggleActivity', // ACTIVITY
  '.zehnButton#zehnToggleCommunity', // COMMUNITY
  '.zehnButton#zehnToggleDetails', // DETAILS
  '._3oddBTkj_FjknCgBnPqcmQ ._3qDWQGB0rtwM3qpXTb11Q-', // SETTINGS
  '._3qDWQGB0rtwM3qpXTb11Q-._1oYt_BfxCHnA-_6sfUHiNn', // CONTROLLER
  '._3qDWQGB0rtwM3qpXTb11Q-', // INFO / SCROLL UP
  '._21hXW2oDD7zvNsoOaW7Yob' // FAVORITE
]);

REVEAL.revealInner('._9EHg918wH6CQCQlD5PWOO');

/* REVEAL SOUNDTRACK ------------------------------------------------------------------------------------------------ */

REVEAL.addRevealClass('._3DLyrg7YP5cNP9HKda62qd ._2U3M1lpKcsYHqfjiz77PQs', [
  '._1iFnR7cGRa1kepep433pGx' // BUTTONS
]);

REVEAL.revealInner('._3DLyrg7YP5cNP9HKda62qd ._2U3M1lpKcsYHqfjiz77PQs');

/* REVEAL URL BAR LIBRARY ------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.UkR3sY319PuaUNuUWks2K', [
  '._2m_orETo6AghzAnc0sISCt' // LIBRARY FAKE INPUT WRAPPER
], [
  'zehnRevealBorderOnly'
]);

REVEAL.addRevealClass('.UkR3sY319PuaUNuUWks2K', [
  '._3KaB94Jl4r0hFkthDPJy09', // BUTTONS
  '.extensions-bar-container .extension-button' // EXTENDIUM
]);

REVEAL.revealInner('.UkR3sY319PuaUNuUWks2K');

/* REVEAL LIBRARY PANELS -------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._3lDczhulqraStjCitLYJ1K.u1xD3KJEgksF_J_5TLZzO', [
  '#zehnCollectionsWrapper' // ALL COLLECTIONS
], [
  'zehnRevealBorderOnly'
]);

REVEAL.revealSelf('#zehnCollectionsWrapper', 300);

REVEAL.addRevealClass('._3lDczhulqraStjCitLYJ1K._1vHgYmF_74E0SSuDevSI9j', [
  '._2q70uOe6xM3-c5XIVfBLe6' // COLLECTION
], [
  'zehnRevealBorderOnly'
]);

REVEAL.revealSelf('._2q70uOe6xM3-c5XIVfBLe6', 300);

REVEAL.addRevealClass('._3lDczhulqraStjCitLYJ1K._2AUVZlzQq67qe3yhLZsPPB', [
  '._2tC_c87MH67xQM7Y0pVyXm', // SHOWCASES
  '._17uEBe5Ri8TMsnfELvs8-N', // WHAT'S NEW
  '._3SkuN_ykQuWGF94fclHdhJ', // ADD SHELF
  '._1dy2s5YuBOYnRrupJmLfRR' // DONE
], [
  'zehnRevealBorderOnly'
]);

REVEAL.revealSelf('._2tC_c87MH67xQM7Y0pVyXm', 300);
REVEAL.revealSelf('._17uEBe5Ri8TMsnfELvs8-N', 300);
REVEAL.revealSelf('._3SkuN_ykQuWGF94fclHdhJ', 300);
REVEAL.revealSelf('._1dy2s5YuBOYnRrupJmLfRR', 300);

REVEAL.addRevealClass('._1ugNiylO2vKXhirsGocAxa', [
  '._3Mbhnlk1Go2j8yCdjthzc7:not(.IbePLaw-vSvhG1GTenYFg)' // DOWNLOADS
], [
  'zehnRevealBorderOnly'
]);

REVEAL.revealSelf('._3Mbhnlk1Go2j8yCdjthzc7:not(.IbePLaw-vSvhG1GTenYFg)', 300);

REVEAL.addRevealClass('._27RcNu8aXKBpYkHcNNrt-X._2OOzYVWIHaKXm6_7sscT9i', [
  '._27RcNu8aXKBpYkHcNNrt-X ._2aor4XVOYzN1PBSREk0UbO .vzLedtsu3TtTlKLEKzIhH', // DETAIL
  '._27RcNu8aXKBpYkHcNNrt-X ._11kuVRYZvWXn-3rBJ_6yL8 ._1OMmVJHDgNwOt0Wqn0hrf9', // SPOTLIGHT (POST GAME)
  '#zehnGameFeatured ._2r4TK4BAuU-J4FuF_O7v_5._3yTl3RiWfo-Itg-xp967wP', // FEATURED ACTIVITY
  '._25oBZpa3dUcMw8QAsa2u67 ._2jPMy2QZr8bWi6yrk5ZzHA', // INFO PANEL
  '._2r4TK4BAuU-J4FuF_O7v_5._3-V8vjmrwuJM6Ws3tsjFJj ._31ptFGGMZrSQc5BCX1e5lm._3KfxIwlXEvum7FCD_AM2_t', // GAME LINKS
  '._1rjqv6aCi9t7H-prIq99fk', // NEW DLC
  '._1RXqe8xTnoJk0PaVkFTk4O', // DEMO
  '._3LE-6w1ItIAB4CKJFCa3Od', // UPDATE REVEAL
  '._3QS6OBHpvI5bXsSQA2zQuW', // COMMUNITY CONTENT
  '.zehnNews', // VIEW LATEST NEWS
  '._3x31AgESSlUqX3D4MTHv2m.YFAtL5H6txGXk5T_IhpUF._2bqRppbRWGNAZV5lfubW7-', // ADD TO FEED
  '.S2Fu9HxHCA5MaCLGrN2ib', // ACTIVITY SECTION
  '.zehnLoad', // LOAD MORE
  '._5uvIN6jXDXzzck59F-nhv._2dnxv1f3olKbOSmfSFezvJ', // OFFLINE MODE
  '._5uvIN6jXDXzzck59F-nhv._1TGl52GwsFQg3CXUYvThP-', // NON STEAM GAME
  '._2-kDc3UDR-GN6V1lBpSupb', // NO ACTIVITY
  '._3UShzJcf4CyVupLSI3kqfD', // LOADING
  '._3yTl3RiWfo-Itg-xp967wP ._3LIdsWmyIgctv5PqN0YTfM', // EMD OF FEED
  '._13HxuJ0oTs2vPOIhoZ48Wm' // NO CONTENT
], [
  'zehnRevealBorderOnly'
]);

REVEAL.revealSelf('._27RcNu8aXKBpYkHcNNrt-X ._2aor4XVOYzN1PBSREk0UbO .vzLedtsu3TtTlKLEKzIhH', 300);
REVEAL.revealSelf('._27RcNu8aXKBpYkHcNNrt-X ._11kuVRYZvWXn-3rBJ_6yL8 ._1OMmVJHDgNwOt0Wqn0hrf9', 300);
REVEAL.revealSelf('#zehnGameFeatured ._2r4TK4BAuU-J4FuF_O7v_5._3yTl3RiWfo-Itg-xp967wP', 300);
REVEAL.revealSelf('._25oBZpa3dUcMw8QAsa2u67 ._2jPMy2QZr8bWi6yrk5ZzHA', 300);
REVEAL.revealSelf('._2r4TK4BAuU-J4FuF_O7v_5._3-V8vjmrwuJM6Ws3tsjFJj ._31ptFGGMZrSQc5BCX1e5lm._3KfxIwlXEvum7FCD_AM2_t', 300);
REVEAL.revealSelf('._1rjqv6aCi9t7H-prIq99fk', 300);
REVEAL.revealSelf('._1RXqe8xTnoJk0PaVkFTk4O', 300);
REVEAL.revealSelf('._3LE-6w1ItIAB4CKJFCa3Od', 300);
REVEAL.revealSelf('._3QS6OBHpvI5bXsSQA2zQuW', 300);
REVEAL.revealSelf('.zehnNews', 300);
REVEAL.revealSelf('._3x31AgESSlUqX3D4MTHv2m.YFAtL5H6txGXk5T_IhpUF._2bqRppbRWGNAZV5lfubW7-', 300);
REVEAL.revealSelf('.S2Fu9HxHCA5MaCLGrN2ib', 300);
REVEAL.revealSelf('.zehnLoad', 300);
REVEAL.revealSelf('._5uvIN6jXDXzzck59F-nhv._2dnxv1f3olKbOSmfSFezvJ', 300);
REVEAL.revealSelf('._5uvIN6jXDXzzck59F-nhv._1TGl52GwsFQg3CXUYvThP-', 300);
REVEAL.revealSelf('._2-kDc3UDR-GN6V1lBpSupb', 300);
REVEAL.revealSelf('._3UShzJcf4CyVupLSI3kqfD', 300);
REVEAL.revealSelf('._3yTl3RiWfo-Itg-xp967wP ._3LIdsWmyIgctv5PqN0YTfM', 300);
REVEAL.revealSelf('._13HxuJ0oTs2vPOIhoZ48Wm', 300);










/* WAIFU DESU ------------------------------------------------------------------------------------------------------- */

WAIFU.findWaifu('.Rp8QOGJ2DypeDniMnRBhr');










/* SUPER SECRET DO NOT LOOK ----------------------------------------------------------------------------------------- */

SECRET.discover('._27qasW5wLU4h4nUgawpo1q');