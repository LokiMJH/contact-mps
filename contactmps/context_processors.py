import urllib

from django.conf import settings
from django.core.urlresolvers import reverse


def general(request):
    """ Add some useful settings into the template helpers.
    """

    info = {
        'BASE_URL': settings.BASE_URL,
        'SITE_NAME': '#RepresentMe',
        'SITE_DESCRIPTION': "How do you feel about the vote of no confidence in the President? Email your MP. Your Parliament. Your Voice.",
    }

    ga_tracking_id = getattr(settings, 'GOOGLE_ANALYTICS_ID', False)
    if not settings.DEBUG and ga_tracking_id:
        info['GOOGLE_ANALYTICS_ID'] = ga_tracking_id
    return info


def is_mobile(request):
    useragent = request.META.get('HTTP_USER_AGENT', '').lower()
    mobiles = [
        'ipad',
        'ipod',
        'iphone',
        'android',
        'blackberry',
    ]
    return {
        'is_mobile': any(mobile in useragent for mobile in mobiles),
    }
