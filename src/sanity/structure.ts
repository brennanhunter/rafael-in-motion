import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Rafael\'s Art')
    .items([
      // Homepage Featured — artwork marked "Show on Homepage"
      S.listItem()
        .title('🏠 Homepage Featured')
        .id('homepage-featured')
        .child(
          S.documentList()
            .title('Homepage Featured')
            .filter('_type == "artwork" && featured == true')
            .defaultOrdering([{field: 'featuredOrder', direction: 'asc'}])
            .menuItems([
              S.orderingMenuItem({name: 'featuredOrderAsc', title: 'Homepage Order', by: [{field: 'featuredOrder', direction: 'asc'}]}),
            ])
        ),

      S.divider(),

      // Elegant Contemporary gallery
      S.listItem()
        .title('🎨 Elegant Contemporary')
        .id('elegant-contemporary')
        .child(
          S.documentList()
            .title('Elegant Contemporary')
            .filter('_type == "artwork" && category == "elegant-contemporary"')
            .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
            .menuItems([
              S.orderingMenuItem({name: 'displayOrderAsc', title: 'Gallery Order', by: [{field: 'displayOrder', direction: 'asc'}]}),
            ])
        ),

      // Abstracts gallery
      S.listItem()
        .title('🖌️ Abstracts')
        .id('abstracts')
        .child(
          S.documentList()
            .title('Abstracts')
            .filter('_type == "artwork" && category == "abstracts"')
            .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
            .menuItems([
              S.orderingMenuItem({name: 'displayOrderAsc', title: 'Gallery Order', by: [{field: 'displayOrder', direction: 'asc'}]}),
            ])
        ),

      S.divider(),

      // All artwork (escape hatch)
      S.listItem()
        .title('📋 All Artwork')
        .id('all-artwork')
        .child(
          S.documentList()
            .title('All Artwork')
            .filter('_type == "artwork"')
            .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
        ),
    ])
