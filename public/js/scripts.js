function aipim_notification(o_not) {
    alert(o_not.text);
}
function aipimNote(o) {
    if (o.remove == true) {
        $(".cookiePolicy").addClass("d-none");
        return;
    }
    $(".cookiePolicy").removeClass("d-none");
    $(".cookiePolicy .cookieDescription").html(o.text);
    $(".cookiePolicy .cookieAction").html(o.actionText);
    $(".cookiePolicy .cookieAction").addClass(o.action);
}
function game_play() {}
function aipimOpenContactBox() {
    $(function () {
        if (typeof Tawk_API !== "undefined") {
            Tawk_API.toggle();
        } else {
            //window.open("https://wa.me/59896666902", "_blank");
        }
    });
}
function animateCSS(element, animationName, callback, faster) {
    const node = document.querySelector(element);
    if (!node) return;
    node.classList.add("animated", animationName);
    if (faster) node.classList.add("faster");
    function handleAnimationEnd() {
        node.classList.remove("animated", animationName);
        node.removeEventListener("animationend", handleAnimationEnd);
        if (typeof callback === "function") callback();
    }
    node.addEventListener("animationend", handleAnimationEnd);
}
$(document).on("scroll", function () {
    if ($(document).scrollTop() > 0) {
        $("#nav-header").addClass("navbar-fixed-top");
    } else {
        $("#nav-header").removeClass("navbar-fixed-top");
    }
});
$(document).on("click", 'a[href^="#"]', function (event) {
    var elem_href = $.attr(this, "href");
    if ($(this).parents(".nav-tabs").length) return;
    if (elem_href == "#promotions-tab" || elem_href == "#reviews-tab") return;
    var fn_animatescroll = function () {
        $("html, body").animate(
            { scrollTop: $(elem_href).offset().top - 70 },
            500
        );
    };
    if (
        elem_href == "#premios" ||
        elem_href == "#funciones-y-mecanica" ||
        elem_href == "#software" ||
        elem_href == "#tematica" ||
        elem_href == "#juegos" ||
        elem_href == "#bonos" ||
        elem_href == "#atencion-al-cliente" ||
        elem_href == "#usabilidad" ||
        elem_href == "#licenses" ||
        elem_href == "#affiliateprogram"
    ) {
        if ($("#btn-minimo-readmore").attr("data-status") == "off") {
            do_readmore(function () {
                fn_animatescroll();
            });
        } else {
            fn_animatescroll();
        }
    } else {
        fn_animatescroll();
    }
});
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    animateCSS(".badge-bonus", "flash");
    animateCSS(".notificationli", "shake");
    setTimeout(function () {
        animateCSS(".notificationli", "shake");
        animateCSS(".card-bonus", "bounce");
    }, 1000 * 5);
    setInterval(function () {
        if ($(".btn-gameParticipate").length) {
            animateCSS(".btn-gameParticipate", "swing");
        }
    }, 1000 * 15);
    $(".btn-iframe-to-mobile-trigger").on("click", function (event) {
        event.preventDefault();
        $(".iframe-preview").addClass("iframe-preview--mobile");
    });
    $(".btn-iframe-to-desktop-trigger").on("click", function (event) {
        event.preventDefault();
        $(".iframe-preview").removeClass("iframe-preview--mobile");
    });
    $(".btn-iframe-to-preview-trigger").on("click", function (event) {
        event.preventDefault();
        $(".iframe-preview").attr(
            "src",
            "//bootstrap-themes.github.io/dashboard"
        );
    });
    $(".btn-iframe-to-details-trigger").on("click", function (event) {
        event.preventDefault();
        $(".iframe-preview").attr("src", location.origin + "/product/stripped");
    });
    $("#submitPreviewIframe").attr(
        "src",
        location.origin + "/product/stripped"
    );
    $('[js-handle="review-toggler"]').on("click", function (e) {
        e.preventDefault();
        $(this).tab("show");
        $(this).removeClass("active");
        $(".sub-nav-link.active").removeClass("active");
        $('.sub-nav-link[href="/#reviews-tab"]').addClass("active");
        $("html, body").animate(
            {
                scrollTop:
                    $('.sub-nav-link[href="/#reviews-tab"]').offset().top - 100,
            },
            1000
        );
    });
    $("#post_review").click(function () {
        if ($("#comment").val() != "") {
            $("#post_review").val("...");
            $("#post_review").attr("disabled", "disabled");
        }
    });
    $("#btn-fullscreen").click(function () {
        var elem = document.getElementById("game-screen");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    });
    $(".btnWideFullscreen").click(function () {
        var elem = document.getElementById("gameWideScreen");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    });
    $(".btn-gameSidebar").click(function () {
        if ($(".gameWideGamebox").hasClass("col-10")) {
            $(".gameWideGamebox").removeClass("col-10 pr-0").addClass("col-12");
            $(".gameWideSidebar").addClass("d-none");
            return;
        } else {
            $(".gameWideGamebox").removeClass("col-12").addClass("col-10 pr-0");
            $(".gameWideSidebar").removeClass("d-none");
            return;
        }
    });
    $("#tc-modal").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        var title = button.data("title");
        var content = button.data("content").replace(/(\r\n|\n|\r)/gm, " ");
        var has_button = button.data("hasbutton");
        var button_text = button.data("button-text");
        var button_url = button.data("button-url");
        var modal = $(this);
        modal.find(".modal-title").text(title);
        modal.find(".modal-body").empty().append($.parseHTML(content));
        if (has_button == "0") {
            console.log("hide btn");
            modal.find(".modal-footer").hide();
        } else {
            modal.find(".btn-tc-primary").text(button_text);
            modal.find(".btn-tc-primary").attr("href", button_url);
        }
    });
    $(".providers-list-view-selector .btn-galleryview").click(function () {
        $(".btn-listview").removeClass("active");
        $(".btn-galleryview").addClass("active");
        $(".list-listview").hide();
        $(".list-galleryview").show();
    });
    $(".providers-list-view-selector .btn-listview").click(function () {
        var html_loadmore = "";
        $(this).addClass("active");
        $(".btn-galleryview").removeClass("active");
        if ($(".list-listview").length) {
            $(".list-galleryview").hide();
            $(".list-listview").show();
            return;
        }
        $(".list-galleryview li.galleryview-item").each(function (index, val) {
            var o_li = $(this);
            if (typeof o_li.data("title") === "undefined") console.log(val);
            html_loadmore += "<tr>";
            html_loadmore += '<td class="d-none d-sm-table-cell">';
            html_loadmore +=
                '<a class="casino-table-image" href="/' +
                o_li.data("url") +
                '">';
            html_loadmore += '<img src="' + o_li.data("image") + '" />';
            html_loadmore += "</a>";
            html_loadmore += "</td>";
            html_loadmore +=
                '<td class="text-left">' + o_li.data("title") + "</td>";
            html_loadmore += '<td class="table-rating d-none d-md-table-cell">';
            html_loadmore += o_li.data("gamescount");
            html_loadmore += "</td>";
            html_loadmore += '<td class="text-right">';
            html_loadmore +=
                '<a class="btn btn-brand btn-bg btn-table-more" href="/' +
                o_li.data("url") +
                '"><i class="fa fa-info-circle" aria-hidden="true"></i>&nbsp;' +
                o_li.data("buttontext") +
                "</a>";
            html_loadmore += "</td>";
            html_loadmore += "</tr>";
        });
        html_loadmore =
            '<div id="casinos-table" class="row list-listview"><table class="table table-striped"><tbody class="casinos-table-body">' +
            html_loadmore;
        html_loadmore = html_loadmore + "</div></div></div>";
        $(".list-galleryview").parent().append(html_loadmore);
        $(".list-galleryview").hide();
    });
    $(".blog-list-view-selector .btn-galleryview").click(function () {
        $(this).addClass("active");
        $(".btn-listview").removeClass("active");
        $(".blog-cards").addClass("card-deck blog-card-grid");
    });
    $(".blog-list-view-selector .btn-listview").click(function () {
        $(this).addClass("active");
        $(".btn-galleryview").removeClass("active");
        $(".blog-cards").removeClass("card-deck blog-card-grid");
    });
});
var do_readmore = function (callback) {
    var $up = $(".minimo-read-more");
    var $this = $("#btn-minimo-readmore");
    var status = $this.data("status");
    var mode = $this.data("mode");
    var original_height = $this.data("original-height");
    var speed_duration = 200;
    if (status == "off") {
        if (original_height == "") {
            $this.data("original-height", $up.height());
        }
        var total_height = 0;
        if (mode && mode == "generalHeight") {
            $up.css("height", "auto");
            total_height = $(".general-description").height();
        } else {
            $(
                ".minimo-read-more img, .minimo-read-more p, .minimo-read-more h2, .minimo-read-more h3, .minimo-read-more ul, .minimo-read-more blockquote, .minimo-read-more div, .minimo-read-more ol"
            ).each(function () {
                total_height += $(this).outerHeight(true);
            });
        }
        $up.animate(
            { height: total_height + "px" },
            speed_duration,
            function () {
                if (callback) callback();
                $this.text($this.data("text-less")).data("status", "on");
                $this.attr("data-status", "on");
            }
        ).addClass("read-more-full");
    } else if (status == "on") {
        $up.removeClass("read-more-full");
        $("html, body").animate({ scrollTop: 0 }, 200, function () {
            $up.animate(
                { height: original_height + "px" },
                speed_duration,
                function () {
                    $this.text($this.data("text-more")).data("status", "off");
                    $this.attr("data-status", "off");
                    if (callback) callback();
                }
            );
        });
    }
};
jQuery(function ($) {
    var cookieTC = false;
    if (Cookies) {
        if (!Cookies.get("bztc")) {
            cookieTC = 0;
            Cookies.set("bztc", cookieTC, { expires: 30 });
        } else {
            cookieTC = Cookies.get("bztc");
        }
        if (cookieTC == 0) {
            aipimNote({
                text: bzTranslation.acceptCookie,
                action: "btnAcceptCookies",
                actionText: bzTranslation.acceptCookieBtnText,
            });
        }
        $(".btnAcceptCookies").click(function () {
            Cookies.set("bztc", 1, { expires: 30 });
            aipimNote({ remove: true });
        });
    }
    $("ul.dropdown-menu li.dropdown").hover(
        function () {
            $(this).addClass("open");
        },
        function () {
            $(this).removeClass("open");
        }
    );
    var dashboardMenu = $("ul.dokan-dashboard-menu"),
        contentArea = $("#content article");
    if (contentArea.height() > dashboardMenu.height()) {
        if ($(window).width() > 767) {
            dashboardMenu.css({ height: contentArea.height() });
        }
    }
    if ($(window).width() < 767) {
        $("#cat-drop-stack li.has-children").on("click", "> a", function (e) {
            e.preventDefault();
            $(this).siblings(".sub-category").slideToggle("fast");
        });
    } else {
        $("#cat-drop-stack li.has-children > .sub-category").each(function (
            index,
            el
        ) {
            var sub_cat = $(el);
            var length = sub_cat.find(".sub-block").length;
            if (length == 3) {
                sub_cat.css("width", "260%");
            } else if (length > 3) {
                sub_cat.css("width", "340%");
            }
        });
    }
    function getGridSize() {
        return window.innerWidth < 600 ? 2 : window.innerWidth < 900 ? 3 : 4;
    }
    $("#btn-minimo-readmore").click(function () {
        do_readmore(function () {
            if ($(".general-description").length) {
                $("html, body").animate(
                    { scrollTop: $(".list-index").offset().top - 70 },
                    500
                );
            }
        });
        return false;
    });
    $(".categoryCasinosFiltersInline button").click(function () {
        var oButton = $(this);
        var buttonCasinoTypeId = oButton.data("casinotype");
        $(".categoryCasinosFiltersInline button").removeClass("active");
        animateCSS(".btnType-" + buttonCasinoTypeId, "flash", null, true);
        oButton.addClass("active");
        if (buttonCasinoTypeId != 0) {
            $("#casinos-table tr").hide();
            $("#casinos-table .ctype-" + buttonCasinoTypeId).show();
        } else {
            $("#casinos-table tr").show();
        }
    });
    $(".categoryCasinosFiltersInline select").change(function () {
        var oSelect = $(this);
        var selectCasinoTypeId = oSelect.val();
        var oButton = $(
            ".categoryCasinosFiltersInline .btnType-" + selectCasinoTypeId
        );
        $(".categoryCasinosFiltersInline button").removeClass("active");
        oButton.addClass("active");
        if (selectCasinoTypeId != 0) {
            $("#casinos-table tr").hide();
            $("#casinos-table .ctype-" + selectCasinoTypeId).show();
        } else {
            $("#casinos-table tr").show();
        }
    });
});

function getUserSetting(a, b) {
    var c = getAllUserSettings();
    return c.hasOwnProperty(a) ? c[a] : "undefined" != typeof b ? b : "";
}
function setUserSetting(a, b, c) {
    if ("object" != typeof userSettings) return !1;
    var d = userSettings.uid,
        e = wpCookies.getHash("wp-settings-" + d),
        f = userSettings.url,
        g = !!userSettings.secure;
    return (
        (a = a.toString().replace(/[^A-Za-z0-9_-]/g, "")),
        (b =
            "number" == typeof b
                ? parseInt(b, 10)
                : b.toString().replace(/[^A-Za-z0-9_-]/g, "")),
        (e = e || {}),
        c ? delete e[a] : (e[a] = b),
        wpCookies.setHash("wp-settings-" + d, e, 31536e3, f, "", g),
        wpCookies.set(
            "wp-settings-time-" + d,
            userSettings.time,
            31536e3,
            f,
            "",
            g
        ),
        a
    );
}
function deleteUserSetting(a) {
    return setUserSetting(a, "", 1);
}
function getAllUserSettings() {
    return "object" != typeof userSettings
        ? {}
        : wpCookies.getHash("wp-settings-" + userSettings.uid) || {};
}
var wpCookies = {
    each: function (a, b, c) {
        var d, e;
        if (!a) return 0;
        if (((c = c || a), "undefined" != typeof a.length)) {
            for (d = 0, e = a.length; d < e; d++)
                if (b.call(c, a[d], d, a) === !1) return 0;
        } else
            for (d in a)
                if (a.hasOwnProperty(d) && b.call(c, a[d], d, a) === !1)
                    return 0;
        return 1;
    },
    getHash: function (a) {
        var b,
            c = this.get(a);
        return (
            c &&
                this.each(c.split("&"), function (a) {
                    (a = a.split("=")), (b = b || {}), (b[a[0]] = a[1]);
                }),
            b
        );
    },
    setHash: function (a, b, c, d, e, f) {
        var g = "";
        this.each(b, function (a, b) {
            g += (g ? "&" : "") + b + "=" + a;
        }),
            this.set(a, g, c, d, e, f);
    },
    get: function (a) {
        var b,
            c,
            d = document.cookie,
            e = a + "=";
        if (d) {
            if (((c = d.indexOf("; " + e)), c === -1)) {
                if (((c = d.indexOf(e)), 0 !== c)) return null;
            } else c += 2;
            return (
                (b = d.indexOf(";", c)),
                b === -1 && (b = d.length),
                decodeURIComponent(d.substring(c + e.length, b))
            );
        }
    },
    set: function (a, b, c, d, e, f) {
        var g = new Date();
        "object" == typeof c && c.toGMTString
            ? (c = c.toGMTString())
            : parseInt(c, 10)
            ? (g.setTime(g.getTime() + 1e3 * parseInt(c, 10)),
              (c = g.toGMTString()))
            : (c = ""),
            (document.cookie =
                a +
                "=" +
                encodeURIComponent(b) +
                (c ? "; expires=" + c : "") +
                (d ? "; path=" + d : "") +
                (e ? "; domain=" + e : "") +
                (f ? "; secure" : ""));
    },
    remove: function (a, b, c, d) {
        this.set(a, "", -1e3, b, c, d);
    },
};
