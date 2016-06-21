/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import PostsNavigation from './posts-navigation';
import observe from 'lib/mixins/data-observe';
import SidebarNavigation from 'my-sites/sidebar-navigation';
import PostList from './post-list';
import config from 'config';
import Main from 'components/main';
import notices from 'notices';
import QueryPosts from 'components/data/query-posts';
import QueryPostCounts from 'components/data/query-post-counts';
import Draft from 'my-sites/draft';
import { getSelectedSiteId } from 'state/ui/selectors';
import {
	getSitePostsForQueryIgnoringPage,
	isRequestingSitePostsForQuery
} from 'state/posts/selectors';
import Button from 'components/button';
import Card from 'components/card';
import Count from 'components/count';
import Gridicon from 'components/gridicon';
import NoResults from 'my-sites/no-results';
import { sectionify } from 'lib/route/path';
import { getAllPostCount } from 'state/posts/counts/selectors';
import { getEditorNewPostPath } from 'state/ui/editor/selectors';

const PostsMain = React.createClass( {
	mixins: [ observe( 'sites' ) ],

	componentWillMount() {
		const selectedSite = this.props.sites.getSelectedSite();
		this.setWarning( selectedSite );
	},

	componentWillReceiveProps( nextProps ) {
		const selectedSite = nextProps.sites.getSelectedSite();
		this.setWarning( selectedSite );
	},

	mostRecentDrafts() {
		const site = this.props.sites.getSelectedSite();
		const isLoading = this.props.draftCount !== 0 && this.props.loadingDrafts;

		return (
			<div className="posts__recent-drafts">
				{ site &&
					<QueryPosts
						siteId={ site.ID }
						query={ this.props.draftsQuery } />
				}
				{ site && <QueryPostCounts siteId={ site.ID } type="post" /> }
				<Card compact className="posts__drafts-header">
					<span>
						{ this.translate( 'Drafts' ) }
						{ this.props.draftCount ? <Count count={ this.props.draftCount } /> : null }
					</span>
					<Button disabled={ ! site } borderless href={ this.props.newPostPath }>
						<Gridicon icon="plus" />
					</Button>
				</Card>
				{ this.props.drafts && this.props.drafts.map( this.renderDraft, this ) }
				{ isLoading && <Draft isPlaceholder /> }
				{ this.props.draftCount === 0 && <NoResults text={ this.translate( 'You have no drafts at the moment.' ) } /> }
				{ site && this.props.draftCount > 50 &&
					<Button compact borderless href={ `/posts/drafts/${ site.slug }` }>
						{ this.translate( 'See all drafts' ) }
					</Button>
				}
			</div>
		);
	},

	renderDraft( draft ) {
		if ( ! draft ) {
			return null;
		}

		return <Draft key={ draft.global_ID } post={ draft } sites={ this.props.sites } />;
	},

	render() {
		const path = sectionify( this.props.context.path );
		return (
			<Main className="posts">
				<SidebarNavigation />
				<div className="posts__primary">
					<PostsNavigation { ...this.props } />
					<PostList { ...this.props } />
				</div>
				{ path !== '/posts/drafts' && this.mostRecentDrafts() }
			</Main>
		);
	},

	setWarning( selectedSite ) {
		if ( selectedSite && selectedSite.jetpack && ! selectedSite.hasMinimumJetpackVersion ) {
			notices.warning(
				this.translate( 'Jetpack %(version)s is required to take full advantage of all post editing features.', { args: { version: config( 'jetpack_min_version' ) } } ),
				{ button: this.translate( 'Update now' ), href: selectedSite.options.admin_url + 'plugins.php?plugin_status=upgrade' }
			);
		}
	}

} );

export default connect( ( state ) => {
	const siteId = getSelectedSiteId( state );
	const draftsQuery = {
		type: 'post',
		status: 'draft',
		order_by: 'modified'
	};

	return {
		drafts: getSitePostsForQueryIgnoringPage( state, siteId, draftsQuery ),
		loadingDrafts: isRequestingSitePostsForQuery( state, siteId, draftsQuery ),
		draftsQuery: draftsQuery,
		draftCount: getAllPostCount( state, siteId, 'post', 'draft' ),
		newPostPath: getEditorNewPostPath( state, siteId )
	};
} )( PostsMain );
