import React from 'react'

const DiscussionThread = () => {
    return (
        <>
            <div className="content-header">
                <div className="thread d-flex flex-column justify-content-start align-items-center">
                    <div className="thread-header w-100 p-2 d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center">
                            <a href="/discussion" className='p-2' style={{ borderRight: '2px solid gray' }}><i class="fa-solid fa-left-long fa-xl"></i></a>
                            <strong className='px-2'>My interview experience at google</strong>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                            <a href="" className='px-2'><i class="fa-solid fa-share-from-square fa-lg"></i></a>
                            <a href="" className='px-2'><i class="fa-solid fa-flag fa-lg"></i></a>
                        </div>

                    </div>
                    <div className="thread-content p-5">
                        <div className="author d-flex justify-content-start align-items-center">
                            <div className="number pfp">
                                <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                            </div>
                            <div className="px-2">
                                <strong>kalash shah</strong>
                            </div>
                            <div className="time">
                                <sub>12/12/12 1.30pm</sub>
                            </div>
                        </div>
                        <div className="thread-mainc py-3">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex natus ea voluptas velit voluptatibus suscipit aut similique, earum quisquam fugit blanditiis quibusdam tenetur totam fugiat cum! Magnam dolorem, illum distinctio quam veniam veritatis. At molestias, ipsam in, dolor hic impedit iste, porro nesciunt ex quod laboriosam quos dignissimos perferendis nemo! Quo sequi molestias, unde velit ipsam ipsa deserunt enim, perspiciatis perferendis sunt minus consequuntur accusamus harum reiciendis nihil repellendus facere repudiandae fugit quam ipsum cum ea odit. Veniam delectus perspiciatis aut, alias ut quibusdam facere commodi quo nisi sed itaque necessitatibus. Explicabo id quas aspernatur. Ut tenetur animi iste quisquam?
                        </div>
                        <div className="thread-interaction w-100">
                            <div className="py-2 d-flex justify-content-start align-item-center">
                                <div className="mark-complete"><a href="#"><i class="fa-regular fa-circle-up "></i></a><small className='px-2'>12 upvotes</small></div>
                                <div className="mark-later px-4"><i class="fa-regular fa-eye "></i><small className='px-2'>12k views</small></div>
                            </div>
                        </div>
                        <div className="thread-comments py-3">
                            <span>Comments</span>
                            <form action="#" method="post" className='comment-form'>
                                <div className="d-flex align-items-center">
                                    <input type="text" className='w-100 p-1' placeholder='Your comment here' style={{ backgroundColor: 'var(--secondaryColor)', color: 'var(--textColor)', borderRadius: '8px 0px 0px 8px' }} />
                                    <button type="submit" className='btn2'>   <div className="hoverEffect">
                                        <div>
                                        </div>
                                    </div>Post</button>
                                </div>
                            </form>
                        </div>
                        <div className="comments w-100 py-2">
                            <div className="comment d-flex justify-content-start align-items-center">
                                <div className="d-flex flex-column justify-content-start align-items-center">
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        <div className="number pfp" style={{ width: '40px', height: '40px' }}>
                                            <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                                        </div>
                                        <div className="px-2">
                                            <small>kalash shah</small>
                                        </div>
                                        <div className="time">
                                            <sub>12/12/12 1.30pm</sub>
                                        </div>
                                    </div>
                                    <div className="comment-text p-2">
                                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At tempora, repellat nisi repellendus odio assumenda cum aut maxime. Quas, impedit!</span>
                                    </div>
                                    <div className="comment-interaction d-flex justify-content-start align-items-center w-100 px-2">
                                        <div className="view-replies">
                                            <sub><button className='btn-list'><i class="fa-solid fa-message"></i>  View replies</button></sub>
                                        </div>
                                        <div className="reply">
                                            <sub><button className='btn-list'><i class="fa-solid fa-reply"></i> Reply</button></sub>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* </div > */}

        </>
    )
}

export default DiscussionThread