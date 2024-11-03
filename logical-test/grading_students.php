<?php
function gradingStudents($grades) {
    $roundedGrades = [];

    foreach ($grades as $grade) {

        if ($grade < 38) {
            $roundedGrades[] = $grade;
        } else {
            $nextMultipleOf5 = ceil($grade / 5) * 5;

            if ($nextMultipleOf5 - $grade < 3) {
                $roundedGrades[] = $nextMultipleOf5;
            } else {
                $roundedGrades[] = $grade;
            }
        }
    }

    return $roundedGrades;
}

$n = intval(fgets(STDIN));
$grades = [];

for ($i = 0; $i < $n; $i++) {
    $grades[] = intval(fgets(STDIN));
}

$result = gradingStudents($grades);

echo "\n";
foreach ($result as $grade) {
    echo $grade . "\n";
}
?>