# CelibrationMail

Problem Statement: Special moments off a pear’s life needs to be celebrated 
inside an organization/institute  Eg: Birthday, Anniversary, Appraisal, etc

Solution: An automated emailing system that would wish and notify people inside and organization/institute about a special moment of a pear’s life 


SPECIAL MOMENTS

Scope and Design:

UC1: Tim has a special moment in her life 
> Tim should get an email at 8 AM wishing her about her special moment with a random quote specific to the special moment.
> Everyone who chooses to subscribe to Tim’s special moments should get a mail at 8AM speaking About her special moment.

UC2: Tim lives in a country other than where the Application Server is located.
>Tim should get an email at 8AM  according to her time Zone.
>Everyone who chooses to subscribe to Tim’s special moments should get a mail according to their time zone at 8AM

UC3: Tim choses to blacklist a certain person from getting mails about her special moments 
>>Blacklisted person should not get a notification about her Special moment.

UC4: Tim’s birthday clashes  with Sam’s marriage anniversary
> Tim should get a birthday wish and also a notification email about Sam’s anniversary
> Sam should get an anniversary mail and a notification email about Tim’s  Birthday

UC5: It is not possible to send notification mail due to 8 am timing 
Eg ::  Tim has her birthday and Sam needs to be notified but 8 Am has already passed in Sam’s time zone 
>> In this case Sam will be notified at the same time at which Tim will get the wish email.
