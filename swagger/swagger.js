/**
 * @swagger
 * definitions:
 *  NewUser:
 *   type: object
 *   properties:
 *     role:
 *       type: number
 *       description: role of a user between 1 to 3 only
 *       example: 3
 *     name:
 *       type: string
 *       description: first name of user
 *       example: "gaurav"
 *     email:
 *       type: string
 *       description: email of user
 *       example: "gkashyap9602@gmail.com" 
 *     mobile_num:
 *       type: number
 *       description: mobile_num of user
 *       example: "898989998" 
 *     password:
 *       type: string
 *       description: password of user
 *       example: "password123" 
 */


/**
 * @swagger
 * /admin/helloadmin:
 *  get:
 *      description: this is to check api work or not
 *      responses:
 *          200:
 *              description: successfull result
 */

/**
 * @swagger
 * /admin/users:
 *  get:
 *      description: this is to get all users
 *      responses:
 *          200:
 *              description: successfull result
 */

/**
 * @swagger
 * /admin/user/create:
 *  post:
 *      description: create a new user
 *      requestBody:
 *         required: true
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#definitions/NewUser'
 *      responses:
 *          201:
 *              description: successfull result
 *          500:
 *              description: in case of error
 */

/**
 * @swagger
 * /admin/user/delete/{id}:
 *  delete:
 *      description: delete a  user
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: id should be string required
 *          schema:
 *              type: string
 *      responses:
 *          201:
 *              description: successfull result
 *          500:
 *              description: in case of error
 */

/**
 * @swagger
 * /admin/user/update/{id}:
 *  patch:
 *      description: update a  user
 *      requestBody:
 *         required: true
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#definitions/NewUser'
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: id should be string required
 *          schema:
 *              type: string
 *      responses:
 *          201:
 *              description: successfull result
 *          500:
 *              description: in case of error
 */
