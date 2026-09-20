# Module map

Portal v1 is defined in [`product/PORTAL.md`](product/PORTAL.md). Status below
is foundation code versus that spec.

| Feature       | Surface                     | Foundation status    | v1 portal                          |
| ------------- | --------------------------- | -------------------- | ---------------------------------- |
| Home          | `/ar`, `/en`                | Complete public page | Unchanged                          |
| Initiative    | `/ar/initiative`            | Complete public page | Unchanged                          |
| Roadmap       | `/ar/roadmap`               | Complete public page | Unchanged                          |
| Participation | `/ar/participation`         | Complete public page | Unchanged                          |
| FAQ           | `/ar/faq`                   | Complete public page | Unchanged                          |
| This week     | `/ar/portal`                | Fixture shell        | Build (status + details + assignment) |
| Weeks         | `/ar/portal/weeks`          | Missing              | Build (current + previous)         |
| Products      | `/ar/portal/products`       | Fixture shell        | Redirect to This week              |
| Cohorts       | `/ar/portal/cohorts`        | Fixture shell        | Redirect to This week              |
| Assignments   | `/ar/portal/assignments`    | Fixture shell        | Redirect to Weeks                  |
| Submissions   | `/ar/portal/submissions`    | Unavailable seam     | Redirect to This week              |
| Reviews       | `/ar/portal/reviews`        | Unavailable seam     | Redirect to This week              |
