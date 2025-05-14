function submitEvaluation(student) {
  alert(`Evaluation for ${student} has been submitted.`);
}

function submitCompanyEval(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.studentName.value;
  const score = form.score.value;
  alert(`Evaluation submitted for ${name} with score ${score}`);
}