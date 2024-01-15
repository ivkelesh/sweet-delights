import { connect } from 'react-redux';

import Wishlistcard from '../WishlistCard/WishlistCard';
import WishlistDashboard from './WishlistDashboard';
import { AppState } from '../../utils/interfaces';

interface Props {
    wishlists: { id: number; title: string; wishListDate: string }[];
    wishlistModal: boolean;
}

function Dashboard({ wishlists, wishlistModal }: Props): JSX.Element {
    return (
        <section className="dashboard-container">
            {!wishlistModal ? (
                wishlists?.map((wishlist) => {
                    let date: string;
                    if (wishlist.wishListDate) {
                        date = wishlist?.wishListDate.split('T')[0];
                    } else {
                        date = 'No time specified';
                    }

                    return (
                        <Wishlistcard
                            key={wishlist.id}
                            title={wishlist.title}
                            id={wishlist.id}
                            date={date}
                        />
                    );
                })
            ) : (
                <WishlistDashboard />
            )}
        </section>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        wishlistModal: state.wishlistModal,
    };
};

export default connect(mapStateToProps, null)(Dashboard);
