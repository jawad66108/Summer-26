CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  industry VARCHAR
);

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id),
  role VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'applied',
  applied_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE interview_rounds (
  id SERIAL PRIMARY KEY,
  application_id INTEGER REFERENCES applications(id),
  round_name VARCHAR NOT NULL,
  round_date DATE,
  outcome VARCHAR DEFAULT 'pending'
);
INSERT INTO companies (name, industry) VALUES
('Google', 'Technology'),
('Amazon', 'E-commerce/Cloud'),
('Anthropic', 'AI Research');


INSERT INTO applications (company_id, role, status) VALUES
(1, 'Software Engineer Intern', 'applied'),
(2, 'SDE Intern', 'interviewing'),
(3, 'ML Systems Intern', 'applied');


INSERT INTO interview_rounds (application_id, round_name, round_date, outcome) VALUES
(2, 'Phone Screen', '2026-07-20', 'passed'),
(2, 'Technical Round 1', '2026-07-27', 'pending');