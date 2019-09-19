/* eslint-disable no-useless-catch */
import database from '../src/models';

class PersonService {
    static async getAllPersons() {
        try {
            return await database.Person.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addPerson(newPerson) {
        try {
            return await database.Person.create(newPerson);
        } catch (error) {
            throw error;
        }
    }

    static async updatePerson(id, updatePerson) {
        try {
            const PersonToUpdate = await database.Person.findOne({
                where: { id: Number(id) }
            });

            if (PersonToUpdate) {
                await database.Person.update(updatePerson, {
                    where: { id: Number(id) }
                });

                return updatePerson;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAPerson(id) {
        try {
            const thePerson = await database.Person.findOne({
                where: { id: Number(id) }
            });

            return thePerson;
        } catch (error) {
            throw error;
        }
    }

    static async deletePerson(id) {
        try {
            const PersonToDelete = await database.Person.findOne({
                where: { id: Number(id) }
            });

            if (PersonToDelete) {
                const deletedPerson = await database.Person.destroy({
                    where: { id: Number(id) }
                });
                return deletedPerson;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default PersonService;
