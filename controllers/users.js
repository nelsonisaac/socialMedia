
import User from "../models/User";

export const getUser = async(req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getUserFriends = async(req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        //we are getting the list of friends and their json object of details by calling findById API multiple times for each list of friend in the user object  
        const friends = await Promise.all(
            user.friends.map((id) => {User.findById(id)})
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**UPDATE */

export const addRemoveFreind = async (req,res) =>{
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friends = await User.findById(friendId);
        

    } catch (error) {
        
    }
}