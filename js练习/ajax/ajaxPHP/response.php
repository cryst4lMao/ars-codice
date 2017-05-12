<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/5/27
 * Time: 17:23
 */
$a[]="Anna";
$a[]="Brittany";
$a[]="Cinderella";
$a[]="Diana";
$a[]="Eva";
$a[]="Fiona";
$a[]="Gunda";
$a[]="Hege";
$a[]="Inga";
$a[]="Johanna";
$a[]="Kitty";
$a[]="Linda";
$a[]="Nina";
$a[]="Ophelia";
$a[]="Petunia";
$a[]="Amanda";
$a[]="Raquel";
$a[]="Cindy";
$a[]="Doris";
$a[]="Eve";
$a[]="Evita";
$a[]="Sunniva";
$a[]="Tove";
$a[]="Unni";
$a[]="Violet";
$a[]="Liza";
$a[]="Elizabeth";
$a[]="Ellen";
$a[]="Wenche";
$a[]="Vicky";

$q = $_GET["q"];


if(strlen($q) > 0){
    $init = "";
    for($i=0; $i<100; $i++){
        if(strtolower($q) == strtolower(substr($a[$i],0,strlen($q)))){
                if($init == ""){
                    $init=$a[$i];
                }else{
                    $init = $init.",".$a[$i];
                }
            }
    }
}
if($init == ""){
    $response = "no suggestion";
}else{
    $response = $init;
}
echo $response;
?>