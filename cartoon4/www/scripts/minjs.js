var beyondLastImage = false;

$(document).ready(function () {
    $('img').on("swipeleft", function () {
        moveToNextImage(this, false);
        if (beyondLastImage) {
            $('img').hide();
            $('#opgave1').show();
        }
    });
    $('img').on("click", function () {
        moveToNextImage(this, false);
        if (beyondLastImage) {
            $('img').hide();
            $('#opgave1').show();
        }
    });
    $('img').on("swiperight", function () {
        moveToNextImage(this, true);
    });
    $('.svar').on("click", function () {
        $(this).closest('.opgave').find('.svar').hide();
        $(this).closest('.opgave').find('.spg').hide();
        $(this).show();
        //alert($(this).closest('div.opgave').attr('id'));
        if ($(this).closest('div.opgave').attr('id') == "opgave5") { $('div.indsend').show(); };
        if ($(this).closest('div.opgave').attr('id') == "opgave4") { $('#opgave5').show(); };
        if ($(this).closest('div.opgave').attr('id') == "opgave3") { $('#opgave4').show(); };
        if ($(this).closest('div.opgave').attr('id') == "opgave2") { $('#opgave3').show(); };
        if ($(this).closest('div.opgave').attr('id') == "opgave1") { $('#opgave2').show(); };
    });
});

function moveToNextImage(image, moveBackWards) {
    var firstImageNo = 0;
    var lastImageNo = 4;
    var noOfDigitsInImageNo = 2;
    var currentImageSource = $(image).attr('src');
    var nextImageSource = nextImageName(currentImageSource, firstImageNo, lastImageNo, noOfDigitsInImageNo, moveBackWards);
    if (nextImageSource) { $(image).attr('src', nextImageSource); };
    if (nextImageSource == null && moveBackWards == false) {
        beyondLastImage = true; //nasty sideeffect!!!!
    }
}

function nextImageName(currentImageName, firstImageNo, lastImageNo, noOfDigitsInImageNo, moveBackWards) {
    //assumes the last digit(s) (before file surname) is the image no
    var imageNo = parseInt(currentImageName.substr(currentImageName.length - 4 - noOfDigitsInImageNo, noOfDigitsInImageNo));
    if (moveBackWards) { imageNo -= 1; } else { imageNo += 1 };
    if (imageNo < firstImageNo || imageNo > lastImageNo) { return null } else { return (currentImageName.substr(0, currentImageName.length - 4 - noOfDigitsInImageNo) + imageNo.pad(noOfDigitsInImageNo) + currentImageName.substr(-4)) };
}

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}