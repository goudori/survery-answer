$(function () {
  $(document).on("change", "#csvFileInput", function () {
    const file = $("#csvFileInput").prop("files")[0];
    const reader = new FileReader();

    /* reader.onload...ファイルの読み込みが完了した時に実行
       e.target.result...読み込まれたファイルの内容を表す文字列です
       csvData.split("\n");...1行ずつ改行する
        */
    reader.onload = function (e) {
      const csvData = e.target.result;

      const rows = csvData.split("\n");

      if (rows.length > 0) {
        const headers = rows[0].split(",");

        let displayHtml = "";

        for (let i = 1; i < rows.length; i++) {
          const data = rows[i].split(",");

          if (data.length === headers.length) {
            for (let j = 0; j < headers.length; j++) {
              displayHtml +=
                "<strong>" + headers[j] + ":</strong>" + data[j] + "<br>";
            }
          } else {
            alert("CSVデータは正しくありません。");
            return;
          }
        }
        $("#displayData").html(displayHtml);
      } else {
        alert("CSVデータは正しくありません");
      }
    };

    reader.readAsText(file);
  });
});
