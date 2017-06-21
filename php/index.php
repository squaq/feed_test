<?php
    function nexDraw($supliedDt=null){
        //date that will be add more days
        $dt = new \DateTime('now', new \DateTimeZone('Europe/Dublin'));
        //today date only 
        $td = new \DateTime('now', new \DateTimeZone('Europe/Dublin'));
        
        //test set date
//        date_date_set($td, 2017, 06, 21);
//        date_date_set($dt, 2017, 06, 21);
        //test set time
//        date_time_set($td, 20, 00, 00);
//        date_time_set($dt, 20, 00, 00);
        
        //supliade date creating
        $spdt = $supliedDt ? new \DateTime($supliedDt) : null;
        //the flag that will stop loop
        $foud_day = true;
        
        while($foud_day) {
            if(($dt->format('N') == 3 || $dt->format('N') == 6) || ($spdt && $spdt < $dt )){
                $label = null;
                
                if(($dt == $td) && ($dt->format('H') < 20)) $label = 'Today at'.$dt->format('d-m-Y').' at 8pm';
                else if($dt > $td) $label = 'Next valid draw will be on '.$dt->format('d-m-Y').' at 8pm<br>';
                
                if($spdt) {
                     if($spdt->format('d-m-Y') == $td->format('d-m-Y') && $spdt->format('H') > $td->format('H')) 
                         $label = 'Today at '.$spdt->format('ha');
                     else if($spdt > $td)
                         $label = 'Next valid draw will be on '.$spdt->format('d-m-Y').' at '.$spdt->format('ha');
                }
                
                if($label){
                    echo $label;
                    $foud_day = false;
                }
            }
            $dt->modify('+1 day');
        }
    }
//    nexDraw();
    nexDraw('2017-06-23 22:00:00');
?>