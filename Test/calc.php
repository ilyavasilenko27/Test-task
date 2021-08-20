<?php
    $data;
    $summn;
    $years_count;
    $summadd_flag;
    $summadd;
    $percent = 0.1;

    if($_POST["date"] || $_POST["sum-deposit"] || $_POST["temp-deposit"] || $_POST["deposit-flag"] || $_POST["add-deposit"]){
        $data = date('Y-m-d', strtotime(str_replace('.', '-', $_POST["date"])));
        $summn = (int)$_POST["sum-deposit"];
        $years_count = (int)$_POST["temp-deposit"];
        $summadd_flag = $_POST["deposit-flag"] === 'true'? true: false;
        $summadd = (int)$_POST["add-deposit"];
        echo calc();
    }

    function calc(){
        global $summadd_flag, $summn, $summadd, $percent, $years_count, $data;
        if($summadd_flag == true){
            $summn_last = $summn;
            for ($i=0; $i < $years_count * 12; $i++) { 
                $summn = $summn_last + ($summn_last) * date("t", strtotime($data)) * ($percent / (date('L', strtotime($data))?366:365));
                $summn_last = $summn + $summadd;
                $data = date('Y-m-d', strtotime($data. ' + 1 month'));
            }
        }
        else{
            $summn_last = $summn;
            for ($i=0; $i < $years_count * 12; $i++) { 
                $summn = $summn_last + ($summn_last) * date("t", strtotime($data)) * ($percent / (date('L', strtotime($data))?366:365));
                $summn_last = $summn;
                $data = date('Y-m-d', strtotime($data. ' + 1 month'));
            }
        }
        return round($summn)." руб.";
    }
?>