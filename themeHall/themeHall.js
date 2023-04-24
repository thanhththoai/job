$(document).on("ready", function () {
  ClickaddRemove(".theme_tab_btn a");
  ClickaddRemove(".snb a");
  tabMenuActive(".snb a", "click", "href");
  ParentDelete(".del_btn");
  $("input[type='file']").change(function (e) {
    var files = e.target.files;
    var arr = Array.prototype.slice.call(files);

    //업로드 가능 파일인지 체크
    for (var i = 0; i < files.length; i++) {
      if (!checkExtension(files[i].name, files[i].size)) {
        return false;
      }
    }

    preview(arr);
  }); //file change

  function checkExtension(fileName, fileSize) {
    var regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
    var maxSize = 20971520; //20MB

    if (fileSize >= maxSize) {
      alert("파일 사이즈 초과");
      $("input[type='file']").val(""); //파일 초기화
      return false;
    }

    if (regex.test(fileName)) {
      alert("업로드 불가능한 파일이 있습니다.");
      $("input[type='file']").val(""); //파일 초기화
      return false;
    }
    return true;
  }

  function preview(arr) {
    arr.forEach(function (f) {
      //파일명이 길면 파일명...으로 처리
      var fileName = f.name;
    //   if (fileName.length > 10) {
    //     fileName = fileName.substring(0, 7) + "...";
    //   }

      //div에 이미지 추가
      var str = `<div class="view_box flex_b_c">
                <p>${fileName}</p>
                <button type="button" class="del_btn"></button>
              </div>`;
      $("#file_upload_preview").append(str);
    });
  }

});
