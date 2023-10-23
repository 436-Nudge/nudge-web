import os
import openai
import requests

openai.api_key = input("Enter API key:")

kill_app = False

class Nudge:
    user_description = "default"

    def run_app(self):
        while(not kill_app):
            self.user_description = self.get_demographic()

            current_user = True
            user_action = 1   ### TODO: Get from Frontend
            while(current_user):       
                result = ""
                documents = self.get_documents()

                match user_action:
                    case 1:
                        result = self.explain_legislation(documents[0])
                    case 2:
                        result = self.compare_legislations(documents)

                self.send_result(result)
                current_user = self.confirm_current_user()


# TODO: display result in Figma
    def send_result(self, resutl):
        print("")

# TODO: Get from Database/Figma
    def get_demographic(self):
        # return selected demographic of user or "default" otherwise
        return f"professor, home owner" 

# TODO: Get from Figma
    def get_user_action(self):
        #return 1 for document summary, 2 for document comparison
        return 1

    def confirm_current_user(self):
        # TODO: Return false if interpution in Figma / Re-select demographic
        return True


    # Read from database embedding of corresponding document selected by user
    def get_documents(self):        
        ### Sample text ###
        text = """
13-911. Sealing of arrest, conviction and sentencing records; requirements; fee; appeal; definition

A. A person may file a petition to seal all case records related to a criminal offense if the person was:

1. Convicted of a criminal offense and has completed all of the terms and conditions of the sentence that was imposed by the court, including the payment of all monetary obligations and restitution to all victims.

2. Charged with a criminal offense and the charge was subsequently dismissed or resulted in a not guilty verdict at a trial.

3. Arrested for a criminal offense and no charges were filed.

B. All case records that are sealed pursuant to this section may be:

1. Alleged as an element of an offense.

2. Used as a historical prior felony conviction.

3. Admissible for impeaching any party or witness in a subsequent trial.

4. Used to enhance the sentence for a subsequent felony.

5. Used to enhance the sentence pursuant to sections 28-1381 and 28-1382.

6. Pleaded and proved in any subsequent prosecution of the person by this state or a political subdivision of this state.

7. Used as a conviction if the conviction would be admissible if the conviction was not sealed.

C. The person shall file a petition to seal all case records in one of the following:

1. The court in which the person was convicted of an offense.

2. The court in which an indictment, information, criminal citation or complaint against the person was filed and the charges were dismissed, the person was found not guilty or the person's conviction was vacated, except that if the complaint was filed in a justice court and subsequent information was filed, the petition must be filed in the superior court.

3. The court in which the person had an initial appearance if charges were not filed.

4. The superior court in the county where a person was arrested if the person did not have an initial appearance and no charges were filed.

D. The court may not grant or deny a petition to seal a person's case records until thirty calendar days after the court receives the petition unless the court receives notice that both the prosecutor and all victims who have made a request for postconviction notice do not object to the petition. Unless the petitioner, prosecutor or victim requests a hearing, the court may grant or deny a petition to seal case records without a hearing. The court may dismiss a petition that does not meet the requirements prescribed in this section without a hearing.  The court shall grant the petition if the court determines that granting the petition is in the best interests of the petitioner and the public's safety. The clerk of the court shall provide a copy of the petition to seal case records to the prosecutor. The prosecutor may respond to the petition and request a hearing.  The victim has a right to be present and heard at any proceeding in which the defendant has filed a petition to seal case records. If the victim has made a request for postconviction notice, the prosecutor shall provide the victim with notice of the defendant's petition and of the victim's rights under this section.

E. At the time of sentencing, the court shall inform the person on the record that the person may be eligible to petition the court for an order that seals all case records of the person's arrest, conviction and sentence that are related to the offense pursuant to this section and shall provide this notice in writing.  A person who was convicted of an offense and who has not subsequently been convicted of any other offense except a misdemeanor violation included in title 28, excluding a conviction for a violation of section 28-1381, 28-1382 or 28-1383, may petition the court to seal the person's records of arrest, conviction and sentence after the person completes all of the terms and conditions of the person's sentence, including paying all fines, fees and restitution that are ordered by the court, and the following period of time has passed since the person completed the conditions of probation or sentence and was discharged by the court:

1. Ten years for a class 2 or 3 felony.

2. Five years for a class 4, 5 or 6 felony.

3. Three years for a class 1 misdemeanor.

4. Two years for a class 2 or 3 misdemeanor.

F. Notwithstanding subsection E of this section, if the person has a prior historical felony conviction, the person may petition the court to seal the person's records of arrest, conviction and sentence pursuant to subsection E of this section after an additional five years.

G. A person who is convicted of two or more offenses may not petition the court to seal the person's case records until the period of time prescribed in subsection E of this section has passed for each conviction.

H. After a petition to seal case records is filed, the court shall notify the department of public safety and request the department to prepare and submit a report to the court that includes all of the petitioner's state and federal arrests, prosecutions and convictions and any other information that the court requests or that the department believes will assist the court in making its determination.  The director may charge the petitioner a fee that is determined by the director for the investigation unless the petitioner is indigent or has been found not guilty or the case was dismissed or not prosecuted and the petition is filed pursuant to subsection C, paragraph 2 or 3 of this section.

I. If the court grants a petition to seal case records:

1. The court shall issue an order sealing all records relating to the petitioner's arrest, conviction and sentence and directing the clerk of the court to notify the department of public safety and the prosecutor of the sealing order.

2. On order of a court, the clerk of the court shall seal all case records relating to the petitioner's arrest, conviction and sentence.  A court order to seal case records pursuant to this section is subject only to the disclosure requirements in this section and shall be treated differently than a record that is sealed pursuant to any other statute or court rule.  The clerk shall create and manage a system for sealing case records pursuant to this section and for providing sealed case records to an entity or person that is listed in subsection J of this section and that requests the record.  On the request of an entity or person listed in subsection J of this section, the clerk shall provide the entity or person with any sealed case records. The clerk may not provide sealed case records pursuant to this section to any person or entity that is not listed in subsection J of this section.

3. The department of public safety shall designate the case records as sealed within the department's records and inform all appropriate state and federal law enforcement agencies of the sealing. The department may not share or provide sealed case records with any person or entity that is not listed in subsections B and J of this section.  The department may charge the successful petitioner a fee determined by the director to research and correct the petitioner's criminal history record unless the petitioner is indigent or has been found not guilty or the case has been dismissed or not prosecuted and the petition is filed pursuant to subsection C, paragraph 2 or 3 of this section.

4. The arresting and prosecuting agencies shall clearly identify in each agency's files and electronic records that the petitioner's arrest or conviction and sentence records are sealed.

5. A person whose records are sealed pursuant to this section may state, in all instances, that the person has never been arrested for, charged with or convicted of the crime that is the subject of the arrest or conviction, including in response to questions on employment, housing, financial aid or loan applications unless any of the following applies:

(a) The person is submitting an application that requires a fingerprint clearance card pursuant to title 41, chapter 12, article 3.1.

(b) The sealed case records involved a violation of chapter 34 of this title.

(c) The sealed case records involved burglary or theft from a residential or nonresidential structure and the person is applying for a job that requires entering into and performing services inside of a residential structure.

(d) The sealed case records involved child abuse or aggravated assault and the person is applying for a job involving supervising, educating or administering care to a minor.

(e) The sealed case records involved vulnerable adult abuse and the person is applying for a job involving supervising or administering care to a vulnerable adult or a person who is at least sixty-five years of age.

(f) The sealed case records involved a violation of section 5-395.01, 5-396, 5-397, 13-1814, 28-1381, 28-1382, 28-1383, 28-8282, 28-8284, 28-8286, 28-8287 or 28-8288 and the person is applying for a job involving the commercial or private operation of a motor vehicle, boat or airplane.

(g) The sealed case records involved theft, theft of means of transportation, forgery, taking the identity of another or fraudulent schemes and artifices and the person is applying for a job involving accounting, overseeing, transporting, handling or managing another person's money or financial assets.

(h) The person is applying for a position with a law enforcement agency, a prosecutor's office, a court, a probation department, a child welfare agency as defined in section 8-501, the department of child safety, the department of juvenile corrections or the state department of corrections.

(i) The person is undergoing a background check for the placement with that person of a child who is in the custody of the department of child safety.

(j) The disclosure is required by a state or federal law.

(k) The disclosure is required to comply with program integrity provisions of medicare, medicaid or any other federal health care program.

6. The person's employer is not liable for hiring or contracting with the person as prescribed in section 12-558.03.

J. If the person's case records are sealed pursuant to this section, the records shall be made available for the purposes listed in subsection B of this section and to the following:

1. The person whose records are sealed and any attorney who has filed a notice of appearance on behalf of the person whose records are sealed.

2. The victim in the case if the victim has exercised victims' rights pursuant to section 13-4414.

3. Any of the following if the purpose relates to the operation of the requesting party's official duties or internal hiring practices, or both:

(a) A law enforcement agency.

(b) A prosecuting agency.  On request of a person who is charged with a criminal offense or that person's attorney of record, a prosecuting agency shall provide the sealed case records of any person whom the prosecuting agency intends to call as a witness in that person's prosecution.

(c) A probation department or any agency that is responsible for the preparation of a presentence report.

(d) A court.

(e) The department of child safety or a child welfare agency as defined in section 8-501.

(f) The department of juvenile corrections.

(g) The state department of corrections or any other correctional facility in this state.

(h) The clerk of the court or any department that is responsible for maintaining court records.

K. This section does not require the supreme court or the court of appeals to seal any record.

L. If the court denies a petition to seal case records, a person may not file a new petition until three years after the date of the denial.

M. A conviction for an offense that is committed in another jurisdiction and that if committed in this state would not constitute an offense in this state may not be used against the petitioner or prohibit the petitioner from having a record sealed.  For the purposes of this section, the classification of an offense committed in another jurisdiction has the classification that the offense would have if committed in this state.

N. If the petitioner is charged with an offense after filing a petition to seal case records and the offense could result in a conviction that cannot be sealed or that could extend the time to file a petition to seal case records, the court may not grant or deny the petition until the court disposes of that charge.

O. This section does not apply to a person who is:

1. Sentenced as a dangerous offender pursuant to section 13-704.

2. Convicted of a dangerous crime against children as defined in section 13-705.

3. Convicted of a serious offense or violent or aggravated felony as defined in section 13-706.

4. Convicted of any offense that has either of the following as an element of the offense:

(a) The discharge, use or threatening exhibition of a deadly weapon or dangerous instrument.

(b) The knowing infliction of serious physical injury on another person.

5. Convicted of sex trafficking pursuant to section 13-1307.

6. Convicted of a class 2, 3, 4 or 5 felony offense that is included in chapter 14 or 35.1 of this title.

P. This section does not affect any of the following:

1. The right of the person whose case records are sealed to appeal the conviction or sentence or to rely on it in bar of any subsequent proceeding for the same offense.

2. The right of a law enforcement agency to maintain an arrest and conviction record and to communicate information regarding the sealed record of arrest or conviction to prosecuting agencies, courts, probation departments and other law enforcement agencies for a purpose listed in subsection J of this section or in defense of a civil action that arises out of the facts of the arrest or to the Arizona peace officer standards and training board solely to assist the board in determining the fitness of a person to serve as a peace officer, except that in any of these cases the information may not be disclosed to any person or entity that is not listed in subsection J of this section.

3. The department of public safety or the board of fingerprinting from considering a conviction that is sealed pursuant to this section when evaluating an application for a fingerprint clearance card pursuant to section 41-1758.03 or 41-1758.07.

Q. For the purposes of this section, "case records" means all records that pertain to a person's arrest, conviction and sentence for a particular offense and that may be sealed pursuant to this section.
                """
        text = text.replace("\n", " ")

        # TODO: Read embedding from database instead
        # API does not directly work with embeddings?? (Particularly ChatCompletion)
        return ["{text}"]


    def explain_legislation(self, document):

        if self.user_description == "default":
            self.user_description = self.get_demographic()

        messages = [ {"role": "system", "content": 
        '''You are a law professor acting as an intelligent assistant in understanding the relevance
        of a document/legislature (that will be input by user) to a user, in particular based on their demographics:
        {self.user_description}'''}, {"role": "user", "content": document}]

        chat = openai.ChatCompletion.create( 
            model="gpt-3.5-turbo", messages=messages 
        ) 
        reply = chat.choices[0].message.content 
        print(f"Nudge gods say: {reply}") 

        return f"{reply}"
    
    def compare_legislations(self, documents):

        if self.user_description == "default":
            self.user_description = self.get_demographic()

        messages = [ {"role": "system", "content": 
        '''You are a law professor acting as an intelligent assistant in understanding the differences between
        two documents/pieces of legislature (that will be input by user) to a user, in particular based on their demographics:
        {self.user_description}'''}, {"role": "user", "content": documents}]

        chat = openai.ChatCompletion.create( 
            model="gpt-3.5-turbo", messages=messages 
        ) 
        reply = chat.choices[0].message.content 
        print(f"Nudge gods say: {reply}") 

        return f"{reply}"
#import figmapy
