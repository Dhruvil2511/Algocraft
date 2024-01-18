import React from 'react'

const CodingResources = () => {
    return (
        <div className='content-header'>
            <h1>Coding Resources</h1>
            <p>Unlock a treasure trove of knowledge with Algocraft's "Coding Resources" – your ultimate destination for a diverse array of coding materials. This feature caters to your learning needs by consolidating valuable resources from various platforms, offering a seamless and comprehensive learning experience.</p>
            <div className="searchBox">
                <input className="searchInput" type="text" name="" placeholder="Search something" />
                <button className="searchButton" href="#">
                    <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                </button>
            </div>
            <span>Search text here</span>



            <div className="mt-3 row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        <div className="card-footer">
                            <a href="/"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer">
                           <a href="/"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        </div>
                        <div className="card-footer">
                           <a href="/"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        </div>
                        <div className="card-footer">
                           <a href="/"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodingResources;