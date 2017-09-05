var loopPlayInit = (function () {
    var $butLeft = null,
        $butRight = null,
        $butPlay = null,
        $imglist = null,
        origin = ['125px', '450px'],
        imgOrigin = ['125px', '800px'],
        imgAll = createImg([['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg'], ['images/5.jpg', 'images/6.jpg', 'images/7.jpg', 'images/8.jpg'], ['images/9.jpg', 'images/10.jpg', 'images/11.jpg', 'images/12.jpg']]),
        imgArrIndex = 0,
        imgAng = 45,
        imgTime = 300,
        rotating = false,
        autoTime = null,
        autointerval = 3000;

    //定义初始化函数
    function init() {
        $butLeft = $('.butLeft'),
            $butRight = $('.butRight'),
            $butPlay = $('.play'),
            $imglist = $('.mainbox ul li');
        //调整图片角度
        configer();
        //绑定点击事件bind
        setEvent();

    }
    //调整图片角度函数
    function configer() {
        var ang = 3,
            aint = -3;
        $imglist.transform({ origin: origin })
        $imglist.each(function (i) {
            var $this = $(this);
            $this.transform({ rotate: aint + (i * ang) + "deg" });
        })
    }
    //绑定点击按钮事件
    function setEvent() {
        $butLeft.bind('click', function () {
            anigo(-1);
        })
        $butRight.bind('click', function () {
            anigo(1);
        })
        $butPlay.bind('click', function () {
            var play = "play",
                pause = "pause",
                $but = $(this);
            if ($but.text() == "play") {
                $but.text(pause);
                autoG0();
            } else {
                $but.text(play);
                autoStop();
            }
            return false;
        })
    }
    //把图片地址转化成图片image对象
    function createImg(arr) {
        var imgArr = [];
        for (var i in arr) {
            imgArr[i] = [];
            for (var x in arr[i]) {
                imgArr[i][x] = new Image();
                imgArr[i][x].src = arr[i][x];
            }
        }
        return imgArr;
    }
    //创建轮播函数anigo
    function anigo(d) {
        imgArrIndex += d;
        if (rotating) return false;
        rotating = true;
        if (imgArrIndex > imgAll.length - 1) {
            imgArrIndex = 0;
        } else if (imgArrIndex < 0) {
            imgArrIndex = imgAll.length - 1;
        }
        $imglist.each(function (i) {
            var $thisItme = $(this);
            var $thisimg = $thisItme.children("img");
            var $targetImg = $(imgAll[imgArrIndex][i]);
            var thisTime = (d === 1) ? imgTime * i : imgTime * ($imglist.length - 1 - i);
            $thisItme.append($targetImg);
            $thisimg.transform({ origin: imgOrigin });
            $targetImg.transform({ origin: imgOrigin, rotate: (0 - d) * imgAng + 'deg' });
            setTimeout(function () {
                $thisimg.animate({ rotate: imgAng * d + 'deg' });
                $targetImg.animate({ rotate: '0deg' }, 500, function () {
                    $thisimg.remove();
                    if (thisTime == (($imglist.length - 1) * imgTime)) {
                        rotating = false;
                    }
                });
            }, thisTime)

        })
    }

    function autoG0() {
        clearInterval(autoTime);
        anigo(1);
        autoTime = setInterval(function () {
            anigo(1);
        }, autointerval);
    }
    function autoStop() {
        clearInterval(autoTime);
    }


    return init;
})();
loopPlayInit();