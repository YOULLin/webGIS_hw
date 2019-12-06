<?php
    header("Content-Type: application/json; charset=UTF-8");
    // read JSON sample
    $jsonFileName = "upload_Picture.json";
    $csvFileName ="";

    // convert to csv file function
    function convertToCSV($jsonArray){
        $jsonArr = $jsonArray;
        $csvFileName = "MoneyBook_monthly";
        $fileType = ".csv";
        $tempFileName = $csvFileName;
        $d = 0;
        // 避免覆寫同一份檔案
        while( file_exists($tempFileName.$fileType) ){
            $d++;
            $tempFileName = $csvFileName." (".$d.")";
        }
        header("Cache-Control: public");
        header("Content-Description: File Transfer");
        header("Content-type: text/x-csv; charset=BIG5");
        header("Content-Disposition: attachment; filename=".$tempFileName.$fileType.'"');
        header('Content-Transfer-Encoding: binary');
        $fpCSV = fopen($tempFileName.$fileType, "w");
        if($fpCSV !== false){
            foreach($jsonArr as $row){
                fputcsv($fpCSV, $row);
            }
        }
        fclose($fpCSV);
    }

    // check JSON file if is exist
    if(file_exists($jsonFileName)){
        $fpJSON = fopen($jsonFileName, "r");
        $contents = "";
        if($fpJSON !== false){
            $contents = file_get_contents($jsonFileName);
        }
        else{
            echo json_encode("error msg: ".$jsonFileName." is not exist");
        }
        fclose($fpJSON);

        // convert encoding
        // $contents = mb_convert_encoding($contents, "BIG5", "UTF-8");
        $jsonObj = "[".$contents."]";
    
        // JSON decode
        if($contents != null || $contents != ''){
            $jsonDecode = json_decode($jsonObj, true);
            convertToCSV($jsonDecode);
            echo json_encode(1);    // 1 is successful
        }
        else{
            echo json_encode("error msg: json file is null");
        }    
    }
    else{
        echo json_encode("error msg: ".$jsonFileName." is not exist");
    }
    exit();
    
?>