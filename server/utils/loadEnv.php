<?php

$lines = file("../.env", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($lines as $line) {
    
    if (strpos($line, '#') === 0 || empty(trim($line))) {
        continue;
    }

    list($key, $value) = explode('=', $line, 2);

    $key = trim($key);
    $value = trim($value);

    putenv("$key=$value");
    $_ENV[$key] = $value;
}