<?php

namespace App;

enum Role: string
{
    case ADMIN = 'admin';
    case TEACHER = 'teacher';
    case STUDENT = 'student';
    case COMPANY = 'company';
}
