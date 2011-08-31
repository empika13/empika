<?php

/**
 * Send mail script.
 *
 * Needs config values to be defined in 'mail_config.php', as:
 *      $host = "smtp.mailserver.com"; //Outgoing Mail (SMTP) Server
 *      $port = "587"; //Set port
 *      $username = "user@domain.com"; //sender account
 *      $password = "user_password"; //sender password
 *
 * Needs to receive 'name', 'email' and 'message' values from either a GET or POST request.
 * Needs PEAR Mail package.
 */

header('Content-Type: text/plain');

$json = array();

$json['success'] = false;
$json['msg'] = 'sorry, email cannot be sent';

$R =& $_REQUEST;

if (
    isset($R['name']) and isset($R['email']) and isset($R['message'])
    and strlen($R['name']) and strlen($R['email']) and strlen($R['message'])
) {

    require_once 'Mail.php';
    require_once 'mail_config.php';

    $from = "Empika website <website@empika.com>"; //email sender
    $mailTo = "gary@chewam.com"; //destination
    $subject = "Empika contact message"; //email subject
    $body = "name: ".$R['name']."\nemail: ".$R['email']."\n\n".$R['message']."\n"; //email body

    $headers = array (
        'From' => $from,
        'To' => $mailTo,
        'Subject' =>  $subject
    );

    $smtp = Mail::factory(
        'smtp',
        array (
            'host' =>  $host,
            'port' =>  $port,
            'auth' =>  true,
            'username' =>  $username,
            'password' =>  $password
        )
    );
 
    $mail = $smtp->send($mailTo, $headers, $body); //call send method

    if (PEAR::isError($mail)) {
        // echo("<p>" . $mail->getMessage() . "</p>");
    } else {
        $json['success'] = true;
        $json['msg'] = 'message successfully sent';
    }

}

print json_encode($json);

?>
