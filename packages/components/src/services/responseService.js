export default class ResponseService {

  static async postResponses(userData, questions) {
    const mappedResponses = questions.map(
      q => {
        return {id: q.id, response: q.response}
      }
    );
    // TODO - actual server call
  }

}
