# Red White and Who Data Import

## Summary

Successfully parsed the Excel file `staging/American_History_Icons_for_Kids.xlsx` containing 49 individuals for the Red White and Who app.

## Generated Files

1. **`insert_red_white_who_data.sql`** - SQL file with all individuals and questions ready to insert into Supabase
2. **`staging/parse_red_white_who_data.js`** - Node.js script used to parse the Excel file

## Data Extracted

- **49 individuals** with:
  - Name
  - Birth year and death year (parsed from "Years Lived" column)
  - Key events (from "Key Event" column)
  - Key facts (from "Key Facts" column)
  - Biographical summary (500-1000 words)
  - 10 questions per individual (from Q1-Q10 columns)

## Important Note: Missing Answers

The Excel file contains **questions but no answers**. Each question in the SQL file has placeholder values:
- `[ANSWER NEEDED]` for correct_answer
- `[WRONG ANSWER 1 NEEDED]` for wrong_answer_1
- `[WRONG ANSWER 2 NEEDED]` for wrong_answer_2
- `[WRONG ANSWER 3 NEEDED]` for wrong_answer_3

**Before running the SQL file, you need to:**
1. Review each question
2. Extract or create the correct answer from the biographical summary
3. Create 3 plausible wrong answers for each question
4. Replace the placeholder values in the SQL file

## How to Use

1. **Ensure tables exist**: Run `create_red_white_who_tables.sql` in Supabase SQL Editor first
2. **Update answers**: Edit `insert_red_white_who_data.sql` to replace placeholder answers
3. **Insert data**: Run `insert_red_white_who_data.sql` in Supabase SQL Editor

## Statistics

- Total individuals: 49
- Total questions: 490 (49 × 10 questions each)
- Questions with placeholder answers: 490 (all need to be filled in)

## Next Steps

1. Review the generated SQL file
2. Fill in the answers for all questions
3. Run the SQL file in Supabase
4. Test the Red White and Who app to ensure data displays correctly

