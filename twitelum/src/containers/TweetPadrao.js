import { connect } from 'react-redux';
import * as TweetsAPI from '../api/TweetsAPI';
import Tweet from '../components/Tweet';

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch, propsRecebidos) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidos.tweetInfo._id));
        },

        likeHandler: () => {
            dispatch(TweetsAPI.like(propsRecebidos.tweetInfo._id));
        }
    }
}



const construtoraDeComponent = connect(mapStateToProps, mapDispatchToProps);

//high order component
const tweetPadraoContainer = construtoraDeComponent(Tweet);

export default tweetPadraoContainer;

