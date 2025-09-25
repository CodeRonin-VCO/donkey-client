import ListCommentsCards from "./components/card-list-comments.jsx";


export default function ListComments({ comments }) {

    return (
        <>
            {
                comments.map(comment =>
                    <ListCommentsCards key={comment.id} comment={comment} />
                )
            }
        </>
    )
}